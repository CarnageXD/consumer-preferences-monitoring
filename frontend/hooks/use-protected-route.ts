import { useAuth } from "@context/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useProtectedRoute = () => {
  const { isAuthenticated, user } = useAuth();
  const { push } = useRouter();

  const forbiddenRoute = !isAuthenticated || user.role !== "ANALYST";

  useEffect(() => {
    if (forbiddenRoute) {
      push("/");
    }
  }, []);

  return forbiddenRoute;
};
