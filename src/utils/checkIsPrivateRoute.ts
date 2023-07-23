import { PRIVATE_ROUTES } from "@/constants/app-routes";

export const checkIsPrivateRoute = (asPath: any) => {
  const appPublicRoutes = Object.values(PRIVATE_ROUTES.private);

  return appPublicRoutes.some((route) => route.name === asPath);
};
