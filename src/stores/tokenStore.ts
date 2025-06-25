import { create } from "zustand";

interface TokenState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
}

export const useTokenStore = create<TokenState>((set) => ({
  accessToken: null,
  refreshToken: null,
  setTokens: (accessToken, refreshToken) =>
    set({ accessToken, refreshToken }),
  clearTokens: () =>
    set({ accessToken: null, refreshToken: null }),
}));
