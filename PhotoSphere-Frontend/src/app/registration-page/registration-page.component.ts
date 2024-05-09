import { Component } from '@angular/core';
import {User} from "../models/user.model";
import {UserService} from "../services/user.service";
import {RouterLink, RouterOutlet, Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, NgForm} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    CommonModule,
    FormsModule
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.css'
})
export class RegistrationPageComponent {
  email: string = '';
  password: string = '';
  user: User = this.userService.blankUser;
  gender: string[] = ["Male", "Female", "Other"];

  constructor(private userService: UserService, private router: Router) {
  }

  convertArrayStringsToInts(stringArray: any[]): number[] {
    return stringArray.map(item => parseInt(item, 10));
  }
  signUp(signUpForm: NgForm) {
    const intNumbers = this.convertArrayStringsToInts(signUpForm.value.dayOfBirth);
    this.user.dayOfBirth = intNumbers;
    console.log('Form Valid:', signUpForm.valid);
    console.log(signUpForm.value.dayOfBirth.split("-"));
    // signUpForm.value.dayOfBirth.split("-");
    // signUpForm.value.dayOfBirth = this.convertArrayElementsToInt(signUpForm.value.dayOfBirth);
    // console.log(signUpForm.value.dayOfBirth);
    if (signUpForm.valid) {
       this.userService.createUser(this.user).subscribe({
        next: (createdUser) => {
          console.log('User created successfully:', createdUser);
          alert('User created successfully');
          this.router.navigate(['/PopularPhotoPage']);
          signUpForm.resetForm();
          this.user = this.userService.blankUser;  // Reset user object to initial state
        },
        error: (error) => {
          console.error('Error creating user:', error);
          alert('Error creating user');
        }
      });
    }
  }


  handleGoogleLogin(): void {
    console.log('Google Login initiated');
    // Implement the Google login logic here
  }
}

