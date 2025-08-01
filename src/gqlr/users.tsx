export const users = `
query MyQuery($pageSize: Int, $after: Int, $filter: [[String]] ) {
  users(pageSize: $pageSize, after: $after, filter: $filter) {
    cursor
    hasMore
    users {
      created_on
      deleted
      email
      first_name
      id
      last_name
      modified_on
      registered
      roles
      status
    }
  }
}`;
