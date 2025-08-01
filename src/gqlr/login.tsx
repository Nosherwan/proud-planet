export const login = `
query MyQuery($email: String!, $password: String!) {
    login(email: $email, password: $password) {
    message
    success
    userInfo {
        email
        exp
        first_name
        last_name
        phone_number
        roles
        title
        }
    }
  }
`;

export const refreshToken = `
  mutation MyMutation {
    refreshAccessToken {
      message
      success
    }
  }
`;

export const logout = `
query MyQuery {
    logout {
    message
    success
    }
  }
`;
