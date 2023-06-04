import { useAuth } from "@context/auth";

export const useProtectedRoute = () => {
  const { isAuthenticated, user } = useAuth();

  const forbiddenRoute = !isAuthenticated || user.role !== "ANALYST";

  return forbiddenRoute;
};
