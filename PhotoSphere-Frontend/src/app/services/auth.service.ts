import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {catchError, map, Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../models/user.model";
import {AuthenticationRequest} from "../models/authentication-request";
import {AuthenticationService} from "../open-api-services/services/authentication.service";
import {TokenService} from "../open-api-services/token/token.service";
import {RegistrationRequest} from "../open-api-services/models/registration-request";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn: boolean = false;
  public loggedUser: User = this.userService.blankUser;
  registerRequest: RegistrationRequest = {
    dayOfBirth: '',
    email: '',
    firstName: '',
    gender: '',
    lastName: '',
    password: '',
    username: ''
  };
  errorMessage: string = "";

  errorMsg: Array<string> = [];
  authRequest: AuthenticationRequest = {email: '', password: ''};
  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {
  }

  logIn(email: string, password: string) {
    this.authRequest.email = email;
    this.authRequest.password = password;
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
        this.userService.getUserByEmail(email).pipe(
          map((user) => {
            if (user) {
              this.loggedUser = user;
              this.isLoggedIn = true;
              this.router.navigate(['/PopularPhotoPage']);
            } else {
              alert('User not found');
            }
          })
        ).subscribe({
          error: (err) => {
            console.log('Error fetching user:', err);
            alert('Error fetching user information');
          }
        });
      },
      error: (err) => {
        console.log('Authentication error:', err);
        if (err.error && err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else if (err.error && err.error.errorMsg) {
          this.errorMsg.push(err.error.errorMsg);
        } else {
          this.errorMsg.push('An unknown error occurred during authentication.');
        }
      }
    });
  }


  // logIn(email: string, password: string) {
  //   this.errorMessage = "";
  //   this.userService.getUserByEmail(email).pipe(
  //     map((user) => {
  //       if (user) {
  //         if (password === user.password) {
  //           this.loggedUser = user;
  //           this.isLoggedIn = true;
  //           this.router.navigate(['/PopularPhotoPage']);
  //         } else {
  //           //console.error('Incorrect password');
  //           alert('Incorrect login data');
  //         }
  //       } else {
  //         //console.error('User not found');
  //         alert('User not found');
  //       }
  //     }),
  //     catchError((error) => {
  //       //console.error('Error fetching user:', error);
  //       alert('Error fetching user');
  //       return of(null);
  //     })
  //   ).subscribe();
  // }

  logOut() {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    this.loggedUser = this.userService.blankUser;
    this.router.navigate(['/logging']);
  }

}





