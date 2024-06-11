import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, NgIf} from "@angular/common";
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {User} from "../models/user.model";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NavBarComponent,
    FormsModule,
    NgIf
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  selectedPhoto: string | ArrayBuffer | null = null;
  profileImageSrc: SafeUrl | string = 'assets/icons/placeholder.png';

  constructor(
    protected authService: AuthService,
    private userService: UserService,
    private router: Router,
    private sanitizer: DomSanitizer) {}

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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.selectedPhoto = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('upload-photo') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onSave(profileEditForm: NgForm): void {
    const userId = this.authService.loggedUser.id;
    if (userId === undefined) {
      console.error('User ID is undefined');
      return;
    }
    if (this.selectedPhoto) {
      // If a new photo is selected, upload it
      const fileInput = document.getElementById('upload-photo') as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {
        const formData = new FormData();
        formData.append('image', fileInput.files[0]);

        this.userService.uploadUserImage(userId, formData).subscribe({
          next: (imageUrl: string) => {
            this.authService.loggedUser.image = imageUrl;
            console.log('Image uploaded successfully:', imageUrl);
            this.updateUserProfile(userId);
            // this.router.navigate(['/ProfilePage']);
          },
          error: err => {
            console.error('Error uploading image', err);
            const userId = this.authService.loggedUser.id;
            this.router.navigate(['/ProfilePage', userId]);
          }
        });
      }
    } else {
      this.updateUserProfile(userId);
    }
  }

  updateUserProfile(userId: number): void {
    const updateUserData: Partial<User> = {
      firstName: this.authService.loggedUser.firstName,
      lastName: this.authService.loggedUser.firstName,
      username: this.authService.loggedUser.username,
      description: this.authService.loggedUser.description
    };

    console.log('Updating user profile with data:', updateUserData);

    this.userService.updateUser(userId, updateUserData).subscribe({
      next: updatedUser => {
        this.authService.loggedUser = updatedUser;
        console.log('User profile updated successfully:', updatedUser);
        const userId = this.authService.loggedUser.id;
        this.router.navigate(['/ProfilePage', userId]);
      },
      error: err => {
        console.error('Error updating user', err);
        const userId = this.authService.loggedUser.id;
        this.router.navigate(['/ProfilePage', userId]);
      }
    });
  }
}

