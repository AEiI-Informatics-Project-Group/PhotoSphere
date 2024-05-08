import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
  }

  getUserByEmail(email: string): Observable<User> {
    const url = `${this.apiUrl}/by-email/${email}`;
    return this.http.get<User>(url);
  }

  getUserById(userId: number | undefined): Observable<User> {
    if (userId === undefined) {
      console.error('User ID is undefined');
      return throwError(() => new Error('User ID is undefined, cannot get user.'));
    }

    return this.http.get<User>(`${this.apiUrl}/${userId}`)
  }

  deleteUserById(userId: number | undefined): Observable<any> {
    if (userId === undefined) {
      console.error('User ID is undefined');
      return throwError(() => new Error('User ID is undefined, cannot delete user.'));
    }

    return this.http.delete(`${this.apiUrl}/${userId}`)
  }

  blankUser : User = {
  userId: 0,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dayOfBirth: new Date(),
  password: "",
}

}
