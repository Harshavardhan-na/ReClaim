import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  authenticate,
  registerAccount,
  logout as authServiceLogout,
  getActiveSession,
} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);

  // Restore Cognito session when the application starts
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const user = await getActiveSession();
        setCurrentUser(user);
      } catch (error) {
        console.error("Session restoration failed:", error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (email, password) => {
    setLoading(true);

    try {
      const { user } = await authenticate({ email, password });
      setCurrentUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ fullName, email, password }) => {
    setLoading(true);

    try {
      const { user } = await registerAccount({
        fullName,
        email,
        password,
      });

      setCurrentUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authServiceLogout();
    } finally {
      setCurrentUser(null);
    }
  };

  const isAuthenticated = Boolean(currentUser);
  const isStudent = currentUser?.role === "student";
  const isAdmin = currentUser?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        usersList,
        loading,
        isAuthenticated,
        isStudent,
        isAdmin,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}