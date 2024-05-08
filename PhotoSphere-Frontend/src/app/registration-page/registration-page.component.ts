import { Component } from '@angular/core';
import {User} from "../models/user.model";
import {UserService} from "../services/user.service";
import {RouterLink, RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.css'
})
export class RegistrationPageComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService) {
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    console.log('Submitting:', { email: this.email, password: this.password });
    // Implement submit logic here
  }

  handleGoogleLogin(): void {
    console.log('Google Login initiated');
    // Implement the Google login logic here
  }
}

