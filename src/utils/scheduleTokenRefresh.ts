import { getCookie } from "./generic";
import { refreshToken } from "./fetchGraphql";

const ENDPOINT = import.meta.env.VITE_API_URL;
const REFRESH_BUFFER_SECONDS = 30;
let refreshTimeOutId: number | undefined = undefined;

export function scheduleTokenRefresh() {
  const cookie = getCookie("user_info");
  console.log("🍪 found:", cookie);

  if (cookie && typeof cookie === "object" && "exp" in cookie) {
    //cookie.exp is a unixtime stamp
    const expiryInSeconds = cookie.exp;
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const timeToExpireSeconds = expiryInSeconds - currentTimeInSeconds;
    //refresh buffer
    const refreshTimeSeconds = timeToExpireSeconds - REFRESH_BUFFER_SECONDS;
    console.log("Refresh-time:", refreshTimeSeconds);
    console.log("Time-to-expire:", timeToExpireSeconds);

    // no need to store expiry
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { exp, ...userProfile } = cookie;
    localStorage.setItem("userProfile", JSON.stringify(userProfile));

    if (refreshTimeSeconds <= 0) {
      //refresh token
      refreshToken(ENDPOINT);
      console.log("immediate refresh.");
    } else {
      if (
        refreshTimeOutId !== undefined &&
        typeof refreshTimeOutId === "number"
      ) {
        clearTimeout(refreshTimeOutId);
      }
      console.log("set time out for refresh.");

      refreshTimeOutId = window.setTimeout(
        () => refreshToken(ENDPOINT),
        refreshTimeSeconds * 1000,
      );
    }
  }
}
