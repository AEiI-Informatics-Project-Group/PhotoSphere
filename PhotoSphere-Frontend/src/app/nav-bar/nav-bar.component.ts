import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AuthService} from "../services/auth.service";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  searchQuery: string = '';

  constructor(
    private router: Router,
    public authService: AuthService
  ) {}


  onNavItemClick(item: string): void {
    console.log(`${item} clicked`);
    if(item == 'Popular') {
      this.router.navigate(['/PopularPhotoPage']);
    }
    if(item == 'New'){
      this.router.navigate(['/NewPhotosPage']);
    }
    if(item == 'Create'){
      this.router.navigate(['/AddNewPhoto']);
    }
    if(item == 'Account'){
      const userId = this.authService.loggedUser.id;
      this.router.navigate(['/ProfilePage', userId]);
    }
  }

  logOut(): void {
    this.authService.logOut();
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.searchQuery.trim() !== '') {
      this.router.navigate(['/SearchResults'], { queryParams: { tag: this.searchQuery.trim() } });
    }
  }
}
