import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, map, mergeMap, Observable, throwError} from 'rxjs';
import {User} from "../models/user.model";
import {Post} from "../models/post.model";
import {TagService} from "./tag.service";
import {Tag} from "../models/tag.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8080/api/posts';
  private tagsApiUrl = 'http://localhost:8080/api/post-tags';

  constructor(private http: HttpClient, private tagService: TagService) {}

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
    return this.http.post(url, formData, { responseType: 'text' }).pipe(
      map((response: string) => {
        // Extract the image URL from the response text
        const imageUrlMatch = response.match(/Image uploaded successfully: (.*)/);
        const imageUrl = imageUrlMatch ? imageUrlMatch[1] : '';
        return { imageUrl };
      })
    );
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

  addTagsToPost(postId: number, tags: string[]): Observable<void[]> {
    const requests = tags.map(tagName => {
      const tag: Tag = { id: 0, name: tagName };
      console.log(`Creating tag: ${tagName}`);
      return this.tagService.createTag(tag).pipe(
        mergeMap(createdTag => {
          console.log(`Created tag with ID: ${createdTag.id}`);
          const postTagPayload = { postId, tagId: createdTag.id };
          console.log(`Associating tag with post: `, postTagPayload);
          return this.http.post<void>(this.tagsApiUrl, postTagPayload);
        })
      );
    });
    return forkJoin(requests);
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
