import { Component, OnInit } from '@angular/core';
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {NgForOf} from "@angular/common";
import {PostService} from "../services/post.service";
import {Router} from "@angular/router";
import {Post} from "../models/post.model";

@Component({
  selector: 'app-popular-photo-page',
  standalone: true,
  imports: [
    NavBarComponent,
    NgForOf
  ],
  templateUrl: './popular-photo-page.component.html',
  styleUrl: './popular-photo-page.component.css'
})
export class PopularPhotoPageComponent implements OnInit {

  posts: Post[] = [];
  postImages: { postId: number, imageUrl: string }[] = [];

  constructor(
    private postService: PostService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(
      (posts: Post[]) => {
        this.posts = posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.loadPostImages();
      },
      (error) => {
        console.error('Failed to load posts: ', error);
      }
    );
  }

  loadPostImages(): void {
    this.posts.forEach(post => {
      this.postService.downloadPostImage(post.id).subscribe(
        (imageBlob: Blob) => {
          const url = URL.createObjectURL(imageBlob);
          this.postImages.push({ postId: post.id, imageUrl: url });
        },
        (error) => {
          console.error(`Failed to load image for post ID ${post.id}:`, error);
        }
      );
    });
  }

  onPhotoClicked(postId: number, imageUrl: string): void {
    this.router.navigate(['/ZoomInPhoto'], { queryParams: { photo: imageUrl, postId } });
  }
}

