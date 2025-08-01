export const catalogues = `
  query MyQuery($pageSize: Int, $after: Int, $filter: [[String]] ) {
  catalogues(pageSize: $pageSize, after: $after, filter: $filter) {
    catalogues {
      average_rating
      category
      content
      created_on
      deleted
      description
      download_count
      image
      slug
      tags
      title
      web_url
      youtube_url
      release_date
      id
    }
    cursor
    hasMore
  }
}`;

export const randomCatalogue = `
  query rCatalogueQuery {
    randomCatalogue {
      average_rating
      category
      content
      created_on
      description
      download_count
      deleted
      image
      slug
      tags
      title
      youtube_url
      web_url
      id
      release_date
    }
  }
  `;
