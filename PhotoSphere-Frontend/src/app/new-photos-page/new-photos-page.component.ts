import { Component, OnInit } from '@angular/core';
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {DatePipe, NgForOf} from "@angular/common";
import {PostService} from "../services/post.service";
import {Router} from "@angular/router";
import {Post} from "../models/post.model";

@Component({
  selector: 'app-new-photos-page',
  standalone: true,
    imports: [
        NavBarComponent,
        NgForOf
    ],
  templateUrl: './new-photos-page.component.html',
  styleUrl: './new-photos-page.component.css'
})
export class NewPhotosPageComponent implements OnInit{

  posts: Post[] = [];
  postImages: { postId: number, imageUrl: string }[] = [];

  constructor(
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRecentPosts();
  }

  loadRecentPosts(): void {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    this.postService.getAllPosts().subscribe(
      (posts: Post[]) => {
        console.log("Current time: ", now);
        console.log("24 hours ago: ", last24Hours);

        this.posts = posts.filter(post => {
          const createdAt = Number(post.createdAt);
          const postDate = new Date(createdAt * 1000);
          console.log(`Post ID: ${post.id}, Created At: ${postDate.toLocaleString()}, Is Recent: ${postDate >= last24Hours}`);
          return postDate >= last24Hours;
        });

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
