import { Component } from '@angular/core';
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    NavBarComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {

  constructor(protected authService: AuthService){}

  filterIconSrc: string = 'assets/icons/filter_category.png';
  imageSrc: string = 'assets/icons/google-logo.png';
  profileDescription: string = "dupadupadupa";
  filterName: string = "Lake";

  onFilterClick(): void {
    console.log('Filter button clicked');
  }

  onImageArticleClick(): void {
    console.log('Image article clicked');
  }

  onPlaceholderClick(): void {
    console.log('Placeholder article clicked');
  }
}
