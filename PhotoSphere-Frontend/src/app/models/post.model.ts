
export interface Post {
  id?: number;
  userId: number;
  caption: string;
  imageUrl: string;
  category: string;
  createdAt: Date;
  comments: [];
  reactions: [];
}
