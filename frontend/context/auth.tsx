import React, { useState, useEffect, createContext, useContext } from "react";
import Cookies from "js-cookie";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (uuid: string, user: any) => void;
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

  const login = (uuid: string, user: any) => {
    const data = {
      uuid,
      user,
    };
    Cookies.set("authData", JSON.stringify(data), { expires: 1 / 24 });
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("authData");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const authDataString = Cookies.get("authData");
    if (authDataString) {
      const authData = JSON.parse(authDataString);
      const { user } = authData;
      setUser(user);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

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
