import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  username: string;
  password: string;
  confirmPassword: string;
  inviteCode: string;
  twoFactorCode: string;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setInviteCode: (inviteCode: string) => void;
  setTwoFactorCode: (code: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      username: "",
      password: "",
      confirmPassword: "",
      inviteCode: "",
      twoFactorCode: "",
      setUsername: (username) => set({ username }),
      setPassword: (password) => set({ password }),
      setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
      setInviteCode: (inviteCode) => set({ inviteCode }),
      setTwoFactorCode: (twoFactorCode) => set({ twoFactorCode }),
    }),
    {
      name: "auth-storage", 
      partialize: (state) => ({ username: state.username }),
    }
  )
);
