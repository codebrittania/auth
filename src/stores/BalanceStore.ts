import { create } from "zustand";

interface BalanceState {
  balance: number | null;
  setBalance: (value: number | null) => void;
}

export const useBalanceStore = create<BalanceState>((set) => ({
  balance: null,
  setBalance: (value) => set({ balance: value }),
}));
