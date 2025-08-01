export const register = `
  mutation MyMutation($email: String!, $firstName: String!, $lastName: String!) {
    registerRequest(email: $email, firstName: $firstName, lastName: $lastName) {
      success
      message
    }
  }
`;

export const createPassword = `
  mutation MyMutation($passwordInput: PasswordInput!) {
    createPassword(passwordInput: $passwordInput) {
      success
      message
    }
  }
`;

export const forgotPassword = `
  mutation MyMutation($email: String!) {
    forgotPassword(email: $email) {
      success
      message
    }
  }
`;
