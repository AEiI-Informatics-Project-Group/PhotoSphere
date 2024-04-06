import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-title-page',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, RouterLink
  ],
  templateUrl: './title-page.component.html',
  styleUrl: './title-page.component.css'
})
export class TitlePageComponent {

}
