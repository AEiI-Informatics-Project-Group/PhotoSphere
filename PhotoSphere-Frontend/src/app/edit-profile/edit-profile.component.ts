import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, NgIf} from "@angular/common";
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {User} from "../models/user.model";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

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
export class EditProfileComponent {
  selectedPhoto: string | ArrayBuffer | null = null;

  constructor(protected authService: AuthService, private userService: UserService, private router: Router) {
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
    fileInput.click();
  }

  onSave(profileEditForm: NgForm): void {
    this.userService.updateUser(this.authService.loggedUser).subscribe({
      next: updatedUser => {
        this.authService.loggedUser = updatedUser;
      },
      error: err => {
        console.error('Error updating user', err);
      }
    });
    this.router.navigate(['/ProfilePage']);
  }

  protected readonly update = this.onSave;
}
