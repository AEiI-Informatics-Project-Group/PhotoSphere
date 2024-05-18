import { Component } from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {NavBarComponent} from "../nav-bar/nav-bar.component";

@Component({
  selector: 'app-edit-photo',
  standalone: true,
  imports: [
    FormsModule,
    NavBarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './edit-photo.component.html',
  styleUrl: './edit-photo.component.css'
})
export class EditPhotoComponent {
  editedPhoto: any;

  onEditPost(editPhotoForm: NgForm): void {

  }

  checkOnly(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const checkboxes = document.getElementsByName('visibility') as NodeListOf<HTMLInputElement>;
    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });
  }

  onItemClick(delete1: string): void {

  }
}
