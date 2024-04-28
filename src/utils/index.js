import { jwtDecode } from "jwt-decode";

export const requestHandler = async (api, setLoading, onSuccess, onError) => {
  setLoading && setLoading(true);
  try {
    const response = await api();
    const { status } = response;
    if (status === 200) {
      onSuccess(response);
    }
  } catch (error) {
    console.log(error);
    if ([401, 403].includes(error?.response?.status)) {
      localStorage.clear();
      if (isBrowser) window.location.href = "/Login";
    }
    onError(error?.response?.data || "Something went wrong");
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

export class JWT {
  static #data;
  static decode(_token) {
    const decodedToken = jwtDecode(_token);
    const { name, role, userId, exp } = decodedToken;
    JWT.#data = { name, role, userId, exp };
    return { name, role, userId, exp };
  }
  static isExpired() {
    return JWT.#data.exp * 1000 < Date.now();
  }
}

export function chunkArray(array, chunkSize) {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize));
  }
  return chunkedArray;
}
