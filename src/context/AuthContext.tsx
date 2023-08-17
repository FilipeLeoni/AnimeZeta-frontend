"use client";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import Cookie from "js-cookie";
import { useApi } from "@/hooks/useApi";
import { decodeAccessToken } from "@/utils/decodeAccessToken";

interface AuthContextData {
  isAuthenticated: boolean | null;
  checkAuthentication: () => void;
  logout: () => void;
  handleLogin: (
    data: {
      accessToken: string;
      username: string;
    },
    rememberMe: boolean
  ) => void;
  isAuthRoute: () => boolean;
  username: string | null;
}

const AuthContext = createContext<AuthContextData>({
  isAuthenticated: null,
  checkAuthentication: () => {},
  logout: () => {},
  handleLogin: () => {},
  isAuthRoute: () => false,
  username: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const pathname = usePathname();
  const api = useApi();

  const isAuthRoute = () => {
    if (pathname === "/auth/login" || pathname === "/auth/register") {
      return true;
    }
    return false;
  };

  const router = useRouter();

  useEffect(() => {
    checkAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuthentication = async () => {
    const accessToken = Cookie.get("accessToken");
    if (accessToken) {
      const username = localStorage.getItem("username");
      setUsername(username);
      setIsAuthenticated(true);
      const decodedToken = decodeAccessToken(accessToken);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp && decodedToken.exp < currentTime) {
        try {
          const refreshTokenResponse = await api.refreshToken();
          const newAccessToken = refreshTokenResponse.data.accessToken;
          Cookie.set("accessToken", newAccessToken);
        } catch (error) {
          logout();
        }
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    Cookie.remove("accessToken");
    router.push("/auth/login");
    setIsAuthenticated(false);
  };

  const handleLogin = (
    data: {
      accessToken: string;
      username: string;
    },
    rememberMe: boolean
  ) => {
    const { accessToken, username } = data;
    if (rememberMe) {
      Cookie.set("accessToken", accessToken, { expires: 7 });
    } else {
      Cookie.set("accessToken", accessToken);
    }
    localStorage.setItem("username", username);
    setUsername(username);
    router.push("/");
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        checkAuthentication,
        logout,
        handleLogin,
        isAuthRoute,
        username,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  return useContext(AuthContext);
};
