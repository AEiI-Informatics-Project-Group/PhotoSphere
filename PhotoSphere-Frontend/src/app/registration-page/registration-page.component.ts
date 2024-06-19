import { Component } from '@angular/core';
import {User} from "../models/user.model";
import {UserService} from "../services/user.service";
import {RouterLink, RouterOutlet, Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, NgForm} from "@angular/forms";
import {RegistrationRequest} from "../open-api-services/models/registration-request";
import {AuthenticationService} from "../open-api-services/services/authentication.service";

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
  errorMsg: Array<string> = [];
  gender: string[] = ["Male", "Female", "Other"];
  registerRequest: RegistrationRequest = {
    dayOfBirth: '',
    email: '',
    firstName: '',
    gender: '',
    lastName: '',
    password: '',
    username: ''
  };
  constructor(private userService: UserService, private router: Router, private authService: AuthenticationService) {
  }

  private getDateAsArray(dateString: string): number[] {
    const parts = dateString.split('-').map(part => parseInt(part, 10));
    return parts; // parts will be an array like [year, month, day]
  }

  // signUp(signUpForm: NgForm) {
  //   console.log(signUpForm.value.dayOfBirth);
  //   const dateArray = this.getDateAsArray(signUpForm.value.dayOfBirth);
  //   signUpForm.value.dayOfBirth = dateArray;
  //   console.log('Date as Array:', dateArray);
  //   if (signUpForm.valid) {
  //      this.userService.createUser(this.user).subscribe({
  //       next: (createdUser) => {
  //         console.log('User created successfully:', createdUser);
  //         alert('User created successfully');
  //         this.router.navigate(['/PopularPhotoPage']);
  //         signUpForm.resetForm();
  //         this.user = this.userService.blankUser;  // Reset user object to initial state
  //       },
  //       error: (error) => {
  //         console.error('Error creating user:', error);
  //         alert('Error creating user');
  //       }
  //     });
  //   }
  // }

  signUp(signUpForm: NgForm) {
    this.registerRequest.dayOfBirth = signUpForm.value.dayOfBirth
    this.registerRequest.email = signUpForm.value.email
    this.registerRequest.firstName = signUpForm.value.firstName
    this.registerRequest.gender = signUpForm.value.gender
    this.registerRequest.lastName = signUpForm.value.lastName
    this.registerRequest.password = signUpForm.value.password
    this.registerRequest.username = signUpForm.value.username
    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest
    })
      .subscribe({
        next: () => {
          this.router.navigate(['/logging']);
        },
        error: (err) => {
          this.errorMsg = err.error.validationErrors;
        }
      });
}
}
