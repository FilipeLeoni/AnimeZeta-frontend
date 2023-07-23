import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext: any = createContext(null);
export const useAuth: any = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const router = useRouter();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const accessToken = localStorage.getItem("accessToken");
    setIsAuthenticated(!!accessToken);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    router.push("/auth/login");
    setIsAuthenticated(false);
  };

  const handleLogin = (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    router.push("/");
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, checkAuthentication, logout, handleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
