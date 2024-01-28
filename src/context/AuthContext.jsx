import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser, registerUser } from "../api";
import { Loader } from "../components";
import { LocalStorage, getUserDataFromToken, requestHandler } from "../utils";
import { GoogleOAuthProvider } from "@react-oauth/google";

const AuthContext = createContext({
  user: null,
  token: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  const login = async (data, authType) => {
    const loginSuccess = (token) => {
      LocalStorage.set("token", token);
      setUser(getUserDataFromToken(token));
      setToken(token);
      navigate("/");
    };

    switch (authType) {
      case "google":
        loginSuccess(data);
        break;

      default:
        await requestHandler(
          async () => await loginUser(data),
          setIsLoading,
          (res) => {
            const { data } = res;
            loginSuccess(data.accessToken);
          },
          alert
        );
        break;
    }
  };

  const register = async (data) => {
    await requestHandler(
      async () => await registerUser(data),
      setIsLoading,
      () => {
        alert("Account created successfully! Go ahead and login.");
        navigate("/Login");
      },
      alert
    );
  };

  const logout = async () => {
    // await requestHandler(
    //   async () => await logoutUser(),
    //   setIsLoading,
    //   () => {
    setUser(null);
    setToken(null);
    LocalStorage.clear();
    navigate("/Login");
    //   },
    //   alert
    // );
  };

  useEffect(() => {
    setIsLoading(true);
    const _token = LocalStorage.get("token");
    if (_token) {
      setUser(getUserDataFromToken(_token));
      setToken(_token);
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, token }}>
      <GoogleOAuthProvider
        clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
      >
        {isLoading ? <Loader /> : children}
      </GoogleOAuthProvider>
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, useAuth };
