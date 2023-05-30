import React, { useState, useEffect, createContext, useContext } from "react";
import Cookies from "js-cookie";
import { getApiUrl } from "@utils";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (jwt: string, user: any) => void;
  logout: () => void;
  user: any;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (jwt: string, user: any) => {
    Cookies.set("user-" + user.id, jwt, { expires: 1 / 24 });
    setUser({ id: user?.id });
    setIsAuthenticated(true);
  };

  const logout = () => {
    console.log(user);
    Cookies.remove("user-" + user?.id);
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    const userIdCookie = Object.keys(Cookies.get()).find((cookie) =>
      cookie.startsWith("user-")
    );
    if (userIdCookie) {
      const userId = userIdCookie.replace("user-", "");
      setUser({ id: userId });
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    if (user && user.id) {
      fetch(getApiUrl(`users/${user.id}`))
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          setUser(data);
        })
        .catch((error) => {});
    }
  }, [user?.id]);

  const contextValue = {
    isAuthenticated,
    login,
    logout,
    user,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
