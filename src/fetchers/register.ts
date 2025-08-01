import {
  createPassword as createPasswordRequest,
  register as registerRequest,
  forgotPassword as forgotPasswordRequest,
} from "../gqlr/register";
import { fetchGraphQL } from "../utils/fetchGraphql";

const endpoint = import.meta.env.PUBLIC_API_URL;

interface RegisterRequestResponse {
  registerRequest: {
    success: boolean;
    message: string;
  };
}

interface CreatePasswordResponse {
  createPassword: {
    success: boolean;
    message: string;
  };
}

interface ForgotPasswordResponse {
  forgotPassword: {
    success: boolean;
    message: string;
  };
}

// Type guard to check if response is RegisterRequestResponse
function isRegisterRequestResponse(
  response: unknown,
): response is RegisterRequestResponse {
  return (
    typeof response === "object" &&
    response !== null &&
    "registerRequest" in response &&
    typeof response.registerRequest === "object" &&
    response.registerRequest !== null &&
    "success" in response.registerRequest &&
    "message" in response.registerRequest
  );
}

// Type guard to check if response is RegisterRequestResponse
function isCreatePasswordResponse(
  response: unknown,
): response is CreatePasswordResponse {
  return (
    typeof response === "object" &&
    response !== null &&
    "createPassword" in response &&
    typeof response.createPassword === "object" &&
    response.createPassword !== null &&
    "success" in response.createPassword &&
    "message" in response.createPassword
  );
}

function isForgotPasswordResponse(
  response: unknown,
): response is ForgotPasswordResponse {
  return (
    typeof response === "object" &&
    response !== null &&
    "forgotPassword" in response &&
    typeof response.forgotPassword === "object" &&
    response.forgotPassword !== null &&
    "success" in response.forgotPassword &&
    "message" in response.forgotPassword
  );
}
export const register = async (
  email: string,
  firstName: string,
  lastName: string,
  // uuid: string,
): Promise<RegisterRequestResponse> => {
  const defaultResponse = {
    registerRequest: { success: false, message: "" },
  };

  const response = await fetchGraphQL(endpoint, registerRequest, {
    email,
    firstName,
    lastName,
  });

  if (isRegisterRequestResponse(response)) {
    return response;
  }
  console.log("🍦 Fetch Response data: ", response);
  return defaultResponse;
};

export const createPassword = async (
  uniqid: string,
  password: string,
): Promise<CreatePasswordResponse> => {
  const defaultResponse = {
    createPassword: { success: false, message: "" },
  };
  const response = await fetchGraphQL(endpoint, createPasswordRequest, {
    passwordInput: { uniqid, password },
  });

  if (isCreatePasswordResponse(response)) {
    return response;
  }

  console.log("🍦 Fetch Response data: ", response);
  return defaultResponse;
};

export const forgotPassword = async (
  email: string,
): Promise<ForgotPasswordResponse> => {
  const defaultResponse = {
    forgotPassword: { success: false, message: "" },
  };
  const response = await fetchGraphQL(endpoint, forgotPasswordRequest, {
    email,
  });

  if (isForgotPasswordResponse(response)) {
    return response;
  }

  console.log("🍦 Fetch Response data: ", response);
  return defaultResponse;
};
