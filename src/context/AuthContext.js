import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { accessTokenRequest, loginUser, registerUser } from "../api";
import { JWT, LocalStorage, requestHandler } from "../utils";
import { useGoogleLogin } from "@react-oauth/google";
import { adminRoles } from "../constants";

export const AuthContext = createContext({
  user: null,
  isAdmin: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
  });

  const navigate = useNavigate();

  const loginSuccess = useCallback(
    (token) => {
      LocalStorage.set("token", token);
      setUser(JWT.decode(token));
      navigate("/");
    },
    [navigate]
  );
  const login = async (data, onError, authType) => {
    switch (authType) {
      case "google":
        handleGoogleLogin();
        // loginSuccess(data);
        break;

      default:
        await requestHandler(
          async () => await loginUser(data),
          setIsLoading,
          (res) => {
            loginSuccess(res.data);
          },
          onError
        );
        break;
    }
  };

  const register = async (data, onSuccess, onError) => {
    await requestHandler(
      async () => await registerUser(data),
      setIsLoading,
      () => {
        onSuccess("Account created successfully! Go ahead and login.");
        navigate("/Login");
      },
      onError
    );
  };

  const logout = async () => {
    // await requestHandler(
    //   async () => await logoutUser(),
    //   setIsLoading,
    //   () => {
    setUser(undefined);
    LocalStorage.clear();
    navigate("/Login");
    //   },
    //   alert
    // );
  };

  useEffect(() => {
    const initUser = async () => {
      const _token = LocalStorage.get("token");
      if (_token) {
        setUser(JWT.decode(_token));
        if (JWT.isExpired()) {
          await requestHandler(
            async () => await accessTokenRequest(),
            setIsLoading,
            (res) => {
              loginSuccess(res.data);
            },
            console.log
          );
        }
      } else {
        setUser(undefined);
      }
      setIsLoading(false);
    };
    initUser();
  }, [loginSuccess]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: adminRoles.includes(user?.role),
        login,
        register,
        logout,
      }}
    >
      {isLoading ? <></> : children}
    </AuthContext.Provider>
  );
};
