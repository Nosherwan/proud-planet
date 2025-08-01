import { fetchGraphQL } from "../utils/fetchGraphql";
import { login as loginRequest, logout as logoutRequest } from "../gqlr/login";

const endpoint = import.meta.env.PUBLIC_API_URL;

interface LoginRequestResponse {
  login: {
    success: boolean;
    message: string;
  };
}

function isLoginResponse(response: unknown): response is LoginRequestResponse {
  return (
    typeof response === "object" &&
    response !== null &&
    "login" in response &&
    typeof response.login === "object" &&
    response.login !== null &&
    "success" in response.login &&
    "message" in response.login
  );
}

export const login = async (
  email: string,
  password: string,
): Promise<LoginRequestResponse> => {
  const response = await fetchGraphQL(endpoint, loginRequest, {
    email,
    password,
  });

  console.log("🍦 Login Response: ", response);
  if (isLoginResponse(response)) return response || {};

  return { login: { success: false, message: "" } };
};

export const logout = async (): Promise<unknown> =>
  await fetchGraphQL(endpoint, logoutRequest, {});
