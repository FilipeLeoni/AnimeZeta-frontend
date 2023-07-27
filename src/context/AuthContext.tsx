"use client";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import Cookie from "js-cookie";

const AuthContext: any = createContext(null);

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const pathname = usePathname();

  const isAuthRoute = () => {
    if (pathname === "/auth/login" || pathname === "/auth/register") {
      return true;
    }
    return false;
  };

  const router = useRouter();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const accessToken = Cookie.get("accessToken");
    setIsAuthenticated(!!accessToken);
  };

  const logout = () => {
    Cookie.remove("accessToken");
    router.push("/auth/login");
    setIsAuthenticated(false);
  };

  const handleLogin = (accessToken: string) => {
    Cookie.set("accessToken", accessToken, { expires: 7 });
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth: any = () => {
  return useContext(AuthContext);
};
