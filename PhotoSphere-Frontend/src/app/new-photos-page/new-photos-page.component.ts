import { Component, OnInit } from '@angular/core';
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {NgForOf} from "@angular/common";

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

  placeholders: number[] = Array(6).fill(0);

  ngOnInit(): void {

  }
}
