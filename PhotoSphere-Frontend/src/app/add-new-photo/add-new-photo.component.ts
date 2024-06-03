import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import { PostService } from "../services/post.service";
import { CommonModule, NgIf } from "@angular/common";
import { AuthService } from '../services/auth.service';
import { Post } from "../models/post.model";
import { Router } from "@angular/router";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-add-new-photo',
  standalone: true,
  imports: [
    NavBarComponent,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './add-new-photo.component.html',
  styleUrls: ['./add-new-photo.component.css']
})
export class AddNewPhotoComponent implements OnInit {

  postImageSrc: SafeUrl | string = 'assets/icons/placeholder.png';
  selectedPhoto: string | ArrayBuffer | null = null;
  post: Post = {
    id: 0,
    userId: this.authService.loggedUser.id,
    caption: '',
    imageUrl: '',
    category: '',
    description: '',
    isPrivate: true,
    createdAt: new Date(),
  };
  isSubmitting: boolean = false;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPostImage();
  }

  loadPostImage(): void {
    const postId = this.post.id;
    if (postId !== undefined) {
      this.postService.downloadPostImage(postId).subscribe(
        (imageBlob: Blob) => {
          const url = URL.createObjectURL(imageBlob);
          this.postImageSrc = this.sanitizer.bypassSecurityTrustUrl(url);
        },
        (error) => {
          console.error('Failed to load post image:', error);
        }
      );
    } else {
      console.error('Post ID is undefined');
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

  onCreatePost(addPhotoForm: NgForm): void {
    if (this.isSubmitting) return;  // Prevent multiple submissions
    this.isSubmitting = true;

    const formValues = addPhotoForm.value;

    this.post.caption = formValues.Title;
    this.post.description = formValues.description;
    this.post.category = formValues.category;
    this.post.isPrivate = formValues.visibility === 'private';

    this.postService.createPost(this.post).subscribe({
      next: createdPost => {
        console.log('Post created successfully:', createdPost);
        this.post.id = createdPost.id;
        if (this.selectedPhoto) {
          this.uploadImageAndSavePost();
        } else {
          this.router.navigate(['/ProfilePage']);
        }
      },
      error: err => {
        console.error('Error creating post', err);
        this.isSubmitting = false;
      }
    });
  }

  uploadImageAndSavePost(): void {
    const fileInput = document.getElementById('upload-photo') as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const formData = new FormData();
      formData.append('image', fileInput.files[0]);

      this.postService.uploadPostImage(this.post.id, formData).subscribe({
        next: (imageUrl: string) => {
          this.post.imageUrl = imageUrl;
          this.savePost(this.post);
        },
        error: err => {
          console.error('Error uploading image', err);
          this.isSubmitting = false;
          this.router.navigate(['/ProfilePage']);
        }
      });
    }
  }

  savePost(newPost: Post): void {
    this.postService.updatePost(newPost).subscribe({
      next: updatedPost => {
        console.log('Post updated successfully:', updatedPost);
        this.router.navigate(['/ProfilePage']);
      },
      error: err => {
        console.error('Error updating post', err);
        this.isSubmitting = false;
      }
    });
  }

  checkOnly(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const checkboxes = document.getElementsByName('visibility') as NodeListOf<HTMLInputElement>;
    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });
    this.post.isPrivate = checkbox.value === 'private';
  }
}
