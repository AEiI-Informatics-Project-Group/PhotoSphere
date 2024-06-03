
export interface Post {
  id: number;
  userId?: number;
  caption: string;
  imageUrl: string;
  category: string;
  description: string;
  isPrivate: boolean;
  createdAt: Date;
}
