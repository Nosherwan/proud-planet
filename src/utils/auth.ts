import { refreshToken } from "./fetchGraphql";
import { getCookie } from "./generic";
const ENDPOINT = import.meta.env.VITE_API_URL;

export async function checkAuth(): Promise<boolean> {
  let userInfo = getCookie("user_info");

  if (userInfo && typeof userInfo === "object") {
    return true;
  }
  console.log("Auth cookie not found, attempt to refresh token");
  try {
    await refreshToken(ENDPOINT);

    userInfo = getCookie("user_info");

    return !!(userInfo && typeof userInfo === "object");
  } catch (error) {
    console.error("Token refresh failed:", error);
    return false;
  }
}
