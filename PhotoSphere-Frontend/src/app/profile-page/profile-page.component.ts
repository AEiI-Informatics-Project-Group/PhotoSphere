import {Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { AuthService } from "../services/auth.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    NavBarComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {

  constructor(private router: Router, protected authService: AuthService, private userService: UserService, private sanitizer: DomSanitizer) {}

  filterIconSrc: string = 'assets/icons/filter_category.png';
  profileImageSrc: SafeUrl | string = 'assets/icons/placeholder.png'; // Placeholder until image loads
  imageSrc: string = 'assets/icons/google-logo.png';
  filterName: string = "Lake";

  ngOnInit(): void {
    this.loadUserProfileImage();
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
