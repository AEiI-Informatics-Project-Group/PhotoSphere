export interface User {
  id?: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  dayOfBirth: [number, number, number];
  description: string;
  image: string;
}
