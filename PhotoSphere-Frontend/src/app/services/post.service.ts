import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User} from "../models/user.model";
import {Post} from "../models/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {}

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }


  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl)
  }


  getPostById(postId: number | undefined): Observable<Post> {
    if (postId === undefined) {
      console.error('Post ID is undefined');
      return throwError(() => new Error('Post ID is undefined, cannot get post.'));
    }

    return this.http.get<Post>(`${this.apiUrl}/${postId}`)
  }

  deletePostById(postId: number | undefined): Observable<any> {
    if (postId === undefined) {
      console.error('Post ID is undefined');
      return throwError(() => new Error('Post ID is undefined, cannot delete post.'));
    }

    return this.http.delete(`${this.apiUrl}/${postId}`)
  }

  updatePost(post: Partial<Post>): Observable<Post> {
    const url = `${this.apiUrl}/${post.id}`;
    return this.http.put<Post>(url, post);
  }

  updatePostFields(postId: number, fields: Partial<Post>): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${postId}`, fields);
  }

  downloadPostImage(postId: number): Observable<Blob> {
    const url = `${this.apiUrl}/${postId}/download-image`;
    return this.http.get(url, { responseType: 'blob' });
  }

  uploadPostImage(postId: number, formData: FormData): Observable<{ imageUrl: string }> {
    const url = `${this.apiUrl}/${postId}/upload-image`;
    return this.http.post<{ imageUrl: string }>(url, formData);
  }

  getPostIdsByUserId(userId: number): Observable<number[]> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<number[]>(url);
  }

  getPostsByCategory(category: string): Observable<Post[]> {
    const url = `${this.apiUrl}/category/${category}`;
    return this.http.get<Post[]>(url);
  }

  getCategoriesByUserId(userId: number): Observable<string[]> {
    const url = `${this.apiUrl}/categories/user/${userId}`;
    return this.http.get<string[]>(url);
  }
  blankPost: Post ={
    id: 0,
    userId: 0,
    caption: "",
    imageUrl: "",
    category: "",
    description: "",
    private: true,
    createdAt: new Date(),
  }
}
