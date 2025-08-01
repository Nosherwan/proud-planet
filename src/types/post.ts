export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  author: string;
  excerpt?: string;
  image?: string;
  category?: string;
  tags?: string[];
  status: string; // Using string since we opted for VARCHAR
  published_on?: string;
  created_on: string;
  modified_on: string;
  modified_by?: string;
  deleted: boolean;
}
