import { jwtDecode } from "jwt-decode";
let decodedData, token;

export const requestHandler = async (api, setLoading, onSuccess, onError) => {
  setLoading && setLoading(true);
  try {
    const response = await api();
    const { data, statusText } = response;
    if (statusText === "OK") {
      onSuccess(data);
    }
  } catch (error) {
    console.log(error);
    if ([401, 403].includes(error?.response.data?.statusCode)) {
      localStorage.clear();
      if (isBrowser) window.location.href = "/Login";
    }
    onError(error?.response?.data?.message || "Something went wrong");
  } finally {
    setLoading && setLoading(false);
  }
};

// Check if the code is running in a browser environment
export const isBrowser = typeof window !== "undefined";

export class LocalStorage {
  static get(key) {
    if (!isBrowser) return;
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  static set(key, value) {
    if (!isBrowser) return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key) {
    if (!isBrowser) return;
    localStorage.removeItem(key);
  }

  static clear() {
    if (!isBrowser) return;
    localStorage.clear();
  }
}

export function getUserDataFromToken() {
  try {
    token = localStorage.getItem("token");
    const isGoogleAuth = token.length > 500; // custom auth or google auth
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp > Date.now() / 1000) {
      decodedData = decodedToken;
      if (isGoogleAuth) {
        decodedData.EmailAddress = decodedToken.email;
        decodedData.UserId = decodedToken.sub;
        decodedData.Username = decodedToken.name;
        decodedData.UserRole = "Google User";
      }
    } else {
      LocalStorage.clear();
      decodedData = null;
    }
  } catch {
    decodedData = null;
  }
  return { ...decodedData };
}

export function isTokenExpired() {
  if (decodedData?.exp <= Date.now() / 1000) {
    return true;
  } else {
    return false;
  }
}

export function chunkArray(array, chunkSize) {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize));
  }
  return chunkedArray;
}
