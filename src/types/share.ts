import { Post } from "./post";
import { Catalogue } from "./catalogue";

export interface Share {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
    exp: number;
  };
  posts: { posts: Post[]; after: number; hasMore: boolean };
  catalogues: {
    catalogues: Catalogue[];
    after: number;
    hasMore: boolean;
    searchTerm: string;
  };
}
