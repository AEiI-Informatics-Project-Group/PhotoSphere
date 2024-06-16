import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { NgForOf, NgIf } from "@angular/common";
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { UserService } from "../services/user.service";
import { Post } from "../models/post.model";
import { PostService } from "../services/post.service";
import { CommentService } from "../services/comment.service";  // Import CommentService
import { Comment } from '../models/comment.model';  // Import Comment model
import { User } from "../models/user.model";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-zoom-in-photo',
  standalone: true,
  imports: [
    NavBarComponent,
    NgIf,
    NgForOf,
    FormsModule  // Include FormsModule here
  ],
  templateUrl: './zoom-in-photo.component.html',
  styleUrls: ['./zoom-in-photo.component.css']
})
export class ZoomInPhotoComponent implements OnInit {
  likeIconSrc: string = "assets/icons/like.png";
  dislikeIconSrc: string = "assets/icons/dislike.png";
  binIconSrc: string = "assets/icons/bin.png";
  funnyIconSrc: string = "assets/icons/funny.png";
  sadIconSrc: string = "assets/icons/sad.png";
  shockedIconSrc: string = "assets/icons/shocked.png";
  addIconSrc: string = "assets/icons/add_comment.png";

  selectedPhoto: string | null = null;
  comments: Comment[] = [];  // Adjust to use Comment[]
  postId: number | null = null;
  postDetails: Post | null = null;
  creatorUsername: string | null = null;
  creatorImageUrl: SafeUrl | string | null = null;
  isCurrentUserOwner: boolean = false;
  newComment: string = '';  // Add a new comment property
  commentCount: number = 0;  // Add a property to keep track of the number of comments

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    protected authService: AuthService,
    private postService: PostService,
    private sanitizer: DomSanitizer,
    private commentService: CommentService  // Inject CommentService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedPhoto = params['photo'] || null;
      this.postId = params['postId'] ? Number(params['postId']) : null;
      if (this.postId) {
        this.fetchPostDetails();
        this.getComments();
      }
    });
    this.scrollToTop();
  }

  fetchPostDetails() {
    if (this.postId !== null) {
      this.postService.getPostById(this.postId).subscribe(
        (post: Post) => {
          this.postDetails = post;
          if (post.userId !== undefined) {
            this.fetchCreatorUsername(post.userId);
            this.isCurrentUserOwner = post.userId === this.authService.loggedUser.id;
          } else {
            console.error('User ID is undefined');
          }
        },
        error => {
          console.error('Failed to fetch post details: ', error);
        }
      );
    }
  }

  fetchCreatorUsername(userId: number) {
    this.userService.getUserById(userId).subscribe(
      (user: User) => {
        this.creatorUsername = user.username;
        this.creatorImageUrl = this.sanitizer.bypassSecurityTrustUrl(`http://localhost:8080/api/users/${userId}/download-image`);
      },
      error => {
        console.error('Failed to fetch creator username: ', error);
      }
    );
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  onItemClick(item: string): void {
    console.log(`${item} clicked`);
    if (item === 'Edit') {
      this.router.navigate(['/EditPhoto'], { queryParams: { photo: this.selectedPhoto, postId: this.postId } });
    }
    if (item === 'Save') {
      if (this.selectedPhoto) {
        const link = document.createElement('a');
        link.href = this.selectedPhoto;
        link.download = 'photo.jpg';  // You can set the desired filename here
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error('No photo selected to save.');
      }
    }
  }

  onDeleteComment(index: number): void {
    const commentId = this.comments[index].id;
    this.commentService.deleteCommentById(commentId).subscribe(() => {
      this.comments.splice(index, 1);
      this.commentCount--;  // Decrement the comment count
    });
  }

  addComment() {
    if (this.newComment.trim() && this.postId !== null) {
      const comment: Partial<Comment> = {  // Use Partial<Comment> to avoid unnecessary fields
        postId: this.postId,
        userId: this.authService.loggedUser.id,
        text: this.newComment.trim(),
      };

      this.commentService.createComment(comment as Comment).subscribe(newComment => {
        this.comments.push(newComment);
        this.newComment = '';
        this.commentCount++;  // Increment the comment count
      }, error => {
        console.error('Failed to add comment:', error);
      });
    }
  }

  getComments(): void {
    if (this.postId !== null) {
      this.commentService.getCommentsByPostId(this.postId).subscribe(comments => {
        this.comments = comments;
        this.commentCount = comments.length;  // Set the comment count
      });
    }
  }

  navigateToUserProfile(userId: number | undefined) {
    if (userId) {
      this.router.navigate(['/ProfilePage', userId]);
    } else {
      console.error('User ID is undefined, cannot navigate to profile page.');
    }
  }
}
