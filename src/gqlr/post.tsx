export const posts = `
query PostsQuery($pageSize: Int, $after: Int, $filter: [[String]]) {
  posts(pageSize: $pageSize, after: $after, filter: $filter ) {
    cursor
    hasMore
    posts {
      author
      category
      excerpt
      id
      image
      slug
      status
      tags
      title
      created_on
      modified_by
      modified_on
      published_on
    }
  }
} `;

export const post = `
  query PostQuery($slug: String!) {
    post(slug: $slug) {
      author
      excerpt
      content
      created_on
      image
      modified_on
      published_on
      status
      tags
      title
    }
  }
`;
