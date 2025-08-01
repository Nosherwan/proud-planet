export const tagsWithCategories = `
  query TagsWithCategoriesQuery {
  tags {
    category
    tags {
      count
      tag
    }
  }
}
`;
