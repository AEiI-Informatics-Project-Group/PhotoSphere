import { Component, OnInit } from '@angular/core';
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {Router, ActivatedRoute} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {NgForOf, NgIf} from "@angular/common";
import {UserService} from "../services/user.service";
import {Post} from "../models/post.model";
import {PostService} from "../services/post.service";
import {User} from "../models/user.model";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-zoom-in-photo',
  standalone: true,
  imports: [
    NavBarComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './zoom-in-photo.component.html',
  styleUrl: './zoom-in-photo.component.css'
})
export class ZoomInPhotoComponent implements OnInit {
  likeIconSrc: string = "assets/icons/like.png";
  dislikeIconSrc: string = "assets/icons/dislike.png";
  binIconSrc: string = "assets/icons/bin.png";
  funnyIconSrc: string = "assets/icons/funny.png";
  sadIconSrc: string = "assets/icons/sad.png";
  shockedIconSrc: string = "assets/icons/shocked.png";
  addIconSrc:string = "assets/icons/add_comment.png"

  selectedPhoto: string | null = null;
  comments: { username: string, text: string }[] = [
    { username: 'Username1', text: 'Comment.' },
    { username: 'Username2', text: 'Comment.' },
    { username: 'Username3', text: 'Comment.' },
    { username: 'Username4', text: 'Comment.' },
    { username: 'Username1', text: 'Comment.' },
    { username: 'Username2', text: 'Comment.' },
    { username: 'Username3', text: 'Comment.' },
    { username: 'Username4', text: 'Comment.' },
  ];

  postId: number | null = null;
  postDetails: Post | null = null;
  creatorUsername: string | null = null;
  creatorImageUrl: SafeUrl | string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private postService: PostService,
    private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedPhoto = params['photo'] || null;
      this.postId = params['postId'] ? Number(params['postId']) : null;
      if (this.postId) {
        this.fetchPostDetails();
      }
    });
    this.scrollToTop();
  }

  fetchPostDetails() {
    if(this.postId !== null) {
      this.postService.getPostById(this.postId).subscribe(
        (post: Post) => {
          this.postDetails = post;
          if(post.userId !== undefined) {
            this.fetchCreatorUsername(post.userId);
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

  checkOnly(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const checkboxes = document.getElementsByName('visibility') as NodeListOf<HTMLInputElement>;
    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });
  }

  onItemClick(item: string): void {
    console.log(`${item} clicked`);
    if (item == 'Edit') {
      this.router.navigate(['/EditPhoto'], { queryParams: { photo: this.selectedPhoto, postId: this.postId}});
    }
    if (item == 'Save') {

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
    this.comments.splice(index, 1);
  }

  addComment(commentText: string) {
    if (commentText) {
      this.comments.push({ username: 'CurrentUser', text: commentText });
    }
  }

  navigateToUserProfile(userId: number | undefined) {
    if (userId) {
      this.router.navigate(['/ProfilePage'], {queryParams: { userId } });
    } else {
      console.error('User ID is undefined, cannot navigate to profile page.');
    }
  }
}
