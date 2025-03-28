import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  educationField?: string;
  educationLevel?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock authentication for demo purposes
  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("eduai_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock login - in a real app, this would call an API
      const mockUser: User = {
        uid: "123456",
        displayName: "Demo User",
        email: email,
        educationField: "Computer Science",
        educationLevel: "undergraduate",
      };
      setUser(mockUser);
      localStorage.setItem("eduai_user", JSON.stringify(mockUser));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    displayName: string,
  ) => {
    setLoading(true);
    try {
      // Mock registration - in a real app, this would call an API
      const mockUser: User = {
        uid: "123456",
        displayName: displayName,
        email: email,
        educationField: "Computer Science",
        educationLevel: "undergraduate",
      };
      setUser(mockUser);
      localStorage.setItem("eduai_user", JSON.stringify(mockUser));
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      // Mock logout
      setUser(null);
      localStorage.removeItem("eduai_user");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
