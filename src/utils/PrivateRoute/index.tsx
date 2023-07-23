import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { push } = useRouter();
  const { isAuthenticated, checkAuthentication } = useAuth();

  useEffect(() => {
    checkAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    push("/auth/login");
  }

  return (
    <>
      {!isAuthenticated && null}
      {isAuthenticated && children}
    </>
  );
};

export default PrivateRoute;
