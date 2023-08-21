"use client";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import Cookie from "js-cookie";
import { useApi } from "@/hooks/useApi";
import { decodeAccessToken } from "@/utils/decodeAccessToken";
import { User } from "@/@types/user";
import { CheckAuthentication } from "@/utils/checkAuthentication";

interface AuthContextData {
  isAuthenticated: boolean | null;
  checkAuthentication: () => void;
  logout: () => void;
  handleLogin: (
    data: {
      accessToken: string;
      user: User;
    },
    rememberMe: boolean
  ) => void;
  isAuthRoute: () => boolean;
  user: User | null;
  avatarUrl: string | null;
  setAvatarUrl: (avatarUrl: string) => void;
}

const AuthContext = createContext<AuthContextData>({
  isAuthenticated: null,
  checkAuthentication: () => {},
  logout: () => {},
  handleLogin: () => {},
  isAuthRoute: () => false,
  user: null,
  avatarUrl: null,
  setAvatarUrl: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const pathname = usePathname();
  const api = useApi();

  const isAuthRoute = () => {
    if (pathname === "/auth/login" || pathname === "/auth/register") {
      return true;
    }
    return false;
  };

  const router = useRouter();

  // useEffect(() => {
  //   checkAuthentication();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const checkAuthentication = async () => {
    const accessToken = Cookie.get("accessToken");
    if (accessToken) {
      const decodedToken = decodeAccessToken(accessToken);
      const currentTime = Date.now() - (60 * 60 * 1000) / 1000;
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        try {
          console.log("refreshing token");
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
      user: User;
    },
    rememberMe: boolean
  ) => {
    const { accessToken, user } = data;

    console.log(accessToken);

    if (rememberMe) {
      Cookie.set("accessToken", accessToken, { expires: 7 });
    } else {
      Cookie.set("accessToken", accessToken);
    }
    setUser(user);
    setAvatarUrl(`${process.env.API_URL}${user.avatarUrl}`);
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
        user,
        avatarUrl,
        setAvatarUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  return useContext(AuthContext);
};
