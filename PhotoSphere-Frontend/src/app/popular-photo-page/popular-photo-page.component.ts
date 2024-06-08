import { Component, OnInit } from '@angular/core';
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {NgForOf} from "@angular/common";

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

  placeholders: number[] = Array(6).fill(0);

  ngOnInit(): void {

  }
}

