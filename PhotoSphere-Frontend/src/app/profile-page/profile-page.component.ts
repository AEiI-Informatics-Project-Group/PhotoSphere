import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { AuthService } from "../services/auth.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {UserService} from "../services/user.service";
import {PostService} from "../services/post.service";
import {NgForOf, NgIf} from "@angular/common";
import {User} from "../models/user.model";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    NavBarComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {

  filterIconSrc: string = 'assets/icons/filter_category.png';
  profileImageSrc: SafeUrl | string = 'assets/icons/placeholder.png';

  profileUsername: string| null = null;
  profileDescription: string| null = null;
  filterName: string = "";
  currentUserId: number | undefined;
  postImages: { postId: number, url: string }[] = [];
  categories: string[] = [];
  showCategoryList: boolean = false;
  isCurrentUserProfile: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              protected authService: AuthService,
              private userService: UserService,
              private sanitizer: DomSanitizer,
              private postService: PostService
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentUserId = +params['id'];
      this.isCurrentUserProfile = this.currentUserId === this.authService.loggedUser.id;
      this.loadUserProfileImage();
      this.loadUserPostImages();
      this.loadUserCategories();
      this.fetchProfileUsernameDescription(this.currentUserId);
    });
  }

  loadUserPostImages(): void {
    if (this.currentUserId !== undefined) {
      this.postService.getPostIdsByUserId(this.currentUserId).subscribe(
        (postIds: number[]) => {
          postIds.reverse();
          postIds.forEach(postId => this.loadPostImage(postId));
        },
        (error) => {
          console.error('Failed to load post IDs:', error);
        }
      );
    } else {
      console.error('User ID is undefined');
    }
  }

  loadPostImage(postId: number): void {
    if (postId !== undefined) {
      this.postService.downloadPostImage(postId).subscribe(
        (imageBlob: Blob) => {
          const url = URL.createObjectURL(imageBlob);
          this.postImages.push({postId, url});
        },
        (error) => {
          console.error(`Failed to load image for post ID ${postId}:`, error);
        }
      );
    } else {
      console.error('Post ID is undefined');
    }
  }

  loadUserProfileImage(): void {
    if (this.currentUserId !== undefined) {
      this.userService.downloadUserImage(this.currentUserId).subscribe(
        (imageBlob: Blob) => {
          const url = URL.createObjectURL(imageBlob);
          this.profileImageSrc = this.sanitizer.bypassSecurityTrustUrl(url);
        },
        (error) => {
          console.error('Failed to load user image:', error);
        }
      );
    } else {
      console.error('User ID is undefined');
    }
  }

  loadUserCategories(): void {
    if (this.currentUserId !== undefined) {
      this.postService.getCategoriesByUserId(this.currentUserId).subscribe(
        (categories: string[]) => {
          this.categories = categories;
        },
        (error) => {
          console.error('Failed to load categories: ', error);
        }
      );
    } else {
      console.error('User ID is undefined');
    }
  }

  fetchProfileUsernameDescription(userId: number) {
    this.userService.getUserById(userId).subscribe(
      (user: User) => {
        this.profileUsername = user.username;
        this.profileDescription = user.description;
      },
      error => {
        console.error('Failed to fetch creator username: ', error);
      }
    );
  }

  onNavButtonClick(item: string): void {
    console.log(`${item} clicked`);
    if(item == 'Public') {
      this.router.navigate(['/PublicPhotos']);
    }
    if(item == 'Private') {
      this.router.navigate(['/PrivatePhotos']);
    }
    if(item == 'Saved') {
      this.router.navigate(['/SavedPhotos']);
    }
    if(item == 'Edit') {
      this.router.navigate(['/EditProfile']);
    }
  }

  onFilterClick(): void {
    console.log('Filter button clicked');
    this.showCategoryList = !this.showCategoryList;
  }

  onCategorySelected(category: string): void {
    console.log(`Category selected: ${category}`);
    this.filterName = category;
    this.showCategoryList = false;
    this.loadFilteredPosts(category);
  }

  loadFilteredPosts(category: string): void {
    if (category) {
      this.postService.getPostsByCategory(category).subscribe(
        (posts) => {
          const userPosts = posts.filter(post => post.userId === this.currentUserId);
          this.postImages = [];
          this.postImages = userPosts.map((post) => ({
            postId: post.id,
            url: post.imageUrl
          }));
          this.postImages.forEach(postImage => {
            this.loadPostImage(postImage.postId);
          });
        },
        (error) => {
          console.error('Failed to load posts by category: ', error);
        }
      );
    } else {
      this.loadUserPostImages();
    }
  }

  onImageArticleClick(postId: number, imageSrc: string): void {
    console.log('Image article clicked');
    this.router.navigate(['/ZoomInPhoto'], { queryParams: { photo: imageSrc, postId } });
  }
}
