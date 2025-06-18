import { create } from "zustand";

interface AuthState {
  username: string;
  password: string;
  confirmPassword: string;
  inviteCode: string;
  twoFactorCode: string;
  setLogin: (login: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setInviteCode: (inviteCode: string) => void;
  setTwoFactorCode: (code: string) => void;
  // register: () => boolean;
  authorize: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  username: "",
  password: "",
  confirmPassword: "",
  inviteCode: "",
  twoFactorCode: "",
  setLogin: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setInviteCode: (inviteCode) => set({ inviteCode }),
  setTwoFactorCode: (twoFactorCode) => set({ twoFactorCode }),
  register: () => {
    const { password, confirmPassword } = get();
    if (password !== confirmPassword) {
      alert("Пароли не совпадают");
      return false;
    }
    if (password.length < 6) {
      alert("Пароль должен содержать минимум 6 символов");
      return false;
    }
    // тут может быть запрос на API
    alert("Регистрация успешна!");
    return true;
  },
  authorize: () => {
    const { username, password, twoFactorCode } = get();
    if (!username || !password || !twoFactorCode) {
      alert("Заполните все поля");
      return false;
    }
    if (twoFactorCode.length < 6) {
      alert("Двухфакторный код должен содержать минимум 6 символов");
      return false;
    }
    alert("Авторизация успешна!");
    return true;
  },
}));
