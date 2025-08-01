import { refreshToken as refreshTokenRequest } from "../gqlr/login";

export function isNetworkResponse(response: unknown): response is Response {
  return (
    typeof response === "object" &&
    response !== null &&
    "statusText" in response
  );
}

export function isError(error: unknown): error is Error {
  return typeof error === "object" && error !== null && "message" in error;
}

export function isNoneEmptyString(query: unknown): query is string {
  return typeof query === "string" && query.trim() !== "";
}

export async function fetchGraphQL(
  endpoint: string,
  query: string,
  variables?: Record<string, unknown>,
  timeout = 10000,
): Promise<unknown> {
  // endpint & query Input validation
  if (!isNoneEmptyString(endpoint)) throw new Error("Invalid endpoint");

  if (!isNoneEmptyString(query)) throw new Error("Invalid query");

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const isServer = typeof window === "undefined";
    endpoint = isServer ? "http://localhost:4000/graphql" : "/graphql";
    const xsrfToken = !isServer ? getXsrfToken() : "";
    if (!xsrfToken) {
      console.warn("CSRF token not found in cookies");
    }

    const fetchCall = () =>
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": xsrfToken ?? "",
          // additional headers like authorization if required by GraphQL server
        },
        credentials: "include", // Enable sending secure cookies back to server automatically
        body: JSON.stringify({ query, variables }),
        signal: controller.signal,
      });

    let response = await fetchCall();

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let responseData = await response.json();
    if (
      responseData.errors &&
      responseData.errors[0].message === "UNAUTHORISED"
    ) {
      const refreshResponse = await refreshToken(endpoint);
      if (refreshResponse?.refreshAccessToken?.success) {
        response = await fetchCall();
        responseData = await response.json();
      }
    }
    if (responseData.errors) {
      throw new Error(`GraphQL error! ${JSON.stringify(responseData.errors)}`);
    }

    return responseData.data;
  } catch (error) {
    if (isError(error)) {
      if (error.name === "AbortError") throw new Error("Request timed out");

      throw new Error(`Error fetching GraphQL data: ${error.message}`);
    }
  } finally {
    clearTimeout(timeoutId);
  }
}

function getXsrfToken(): string | undefined {
  const cookies = document.cookie.split(";");
  const xsrfCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("xcsrf_token="),
  );
  if (!xsrfCookie) return undefined;
  return decodeURIComponent(xsrfCookie.split("=")[1]);
}

interface RefreshTokenResponse {
  refreshAccessToken?: {
    success: boolean;
  };
}
export async function refreshToken(
  endpoint: string,
): Promise<RefreshTokenResponse> {
  const defaultResponse = { refreshAccessToken: { success: false } };
  const response = await fetchGraphQL(endpoint, refreshTokenRequest, {});

  console.log("♻️ refreshToken response: ", response);

  return { ...defaultResponse, ...(response as object) };
}
