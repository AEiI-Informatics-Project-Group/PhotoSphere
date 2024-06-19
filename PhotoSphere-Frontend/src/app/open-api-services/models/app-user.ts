/* tslint:disable */
/* eslint-disable */
import { GrantedAuthority } from '../models/granted-authority';
import { Role } from '../models/role';
export interface AppUser {
  accountLocked?: boolean;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  authorities?: Array<GrantedAuthority>;
  credentialsNonExpired?: boolean;
  dayOfBirth?: string;
  description?: string;
  email?: string;
  enabled?: boolean;
  firstName?: string;
  fullName?: string;
  gender?: string;
  id?: number;
  image?: string;
  lastName?: string;
  name?: string;
  password?: string;
  roles?: Array<Role>;
  username?: string;
}
