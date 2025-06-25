import { create } from "zustand";

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

export const useAuthStore = create<AuthState>((set) => ({
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
}));
