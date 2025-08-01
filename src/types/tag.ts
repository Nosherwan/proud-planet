export type TagWithCount = {
  tag?: string; // Making 'tag' optional to align with GraphQL's nullable default
  count?: number; // Making 'count' optional to align with GraphQL's nullable default
};

export type TagCategory = {
  category?: string; // Making 'category' optional to align with GraphQL's nullable default
  tags?: TagWithCount[]; // Making 'tags' optional and an array of TagWithCount, aligning with GraphQL's nullable default
};
