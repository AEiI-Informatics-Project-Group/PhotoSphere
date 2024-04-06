import { Routes } from '@angular/router';
import {TitlePageComponent} from "./title-page/title-page.component";
import {UsersComponent} from "./users/users.component";

export const routes: Routes = [
  {path: 'users', component: UsersComponent}
];
