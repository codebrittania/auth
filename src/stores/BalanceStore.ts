import { create } from 'zustand';

interface WithdrawalState {
  withdrawAmount: string;
  
}

export const useWithdrawalStore = create<WithdrawalState>((set) => ({
  withdrawAmount: '',

}));
