import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
  educationField: string;
  progress: {
    courses: number;
    quizzes: number;
  };
  joinDate: Date;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    educationLevel: string,
  ) => Promise<void>;
  logout: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async (email, password) => {
    set({ isLoading: true });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock successful login
    set({
      isAuthenticated: true,
      isLoading: false,
      user: {
        id: "1",
        name: email.split("@")[0],
        email,
        educationField: "Computer Science",
        progress: {
          courses: 65,
          quizzes: 42,
        },
        joinDate: new Date(),
      },
    });
  },
  register: async (name, email, password, educationLevel) => {
    set({ isLoading: true });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock successful registration
    set({
      isAuthenticated: true,
      isLoading: false,
      user: {
        id: "1",
        name,
        email,
        educationField: educationLevel,
        progress: {
          courses: 0,
          quizzes: 0,
        },
        joinDate: new Date(),
      },
    });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
