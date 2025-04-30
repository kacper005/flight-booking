import React from "react";
import { getUserMe } from "@api/userApi";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const fetchUser = async () => {
    try {
      const res = await getUserMe();
      setUser(res.data);
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      logout();
    }
  };

  const login = async (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    setUser(null);
    setIsLoggedIn(false);
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
