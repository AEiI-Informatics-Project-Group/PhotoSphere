import { Routes } from '@angular/router';
import {TitlePageComponent} from "./title-page/title-page.component";
import {UsersComponent} from "./users/users.component";
import {UserPageComponent} from "./user-page/user-page.component";

export const routes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'users/:id', component: UserPageComponent}
];
