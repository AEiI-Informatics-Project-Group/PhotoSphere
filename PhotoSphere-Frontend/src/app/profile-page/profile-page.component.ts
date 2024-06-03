import {Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { AuthService } from "../services/auth.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {UserService} from "../services/user.service";
import {PostService} from "../services/post.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    NavBarComponent,
    NgForOf
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {


  filterIconSrc: string = 'assets/icons/filter_category.png';
  profileImageSrc: SafeUrl | string = 'assets/icons/placeholder.png'; // Placeholder until image loads
  imageSrc: string = 'assets/icons/google-logo.png';

  filterName: string = "Lake";
  loggedUserId: number | undefined;
  postImageSrcs: string[] = []; // Array to hold multiple post images

  constructor(private router: Router,
              protected authService: AuthService,
              private userService: UserService,
              private sanitizer: DomSanitizer,
              private postService: PostService,)
  { this.loggedUserId = this.authService.loggedUser.id;}


  ngOnInit(): void {
    this.loadUserProfileImage();
    this.loadUserPostImages();
  }


  loadUserPostImages(): void {
    if (this.loggedUserId !== undefined) {
      this.postService.getPostIdsByUserId(this.loggedUserId).subscribe(
        (postIds: number[]) => {
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
          this.postImageSrcs.push(url);
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
    const userId = this.authService.loggedUser.id;
    if (userId !== undefined) {
      this.userService.downloadUserImage(userId).subscribe(
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
  }

  onImageArticleClick(imageSrc: string): void {
    console.log('Image article clicked');
    this.router.navigate(['/ZoomInPhoto'], { queryParams: { photo: imageSrc } });
  }

  onPlaceholderClick(): void {
    console.log('Placeholder article clicked');
  }
}
