
import { create } from 'zustand';

interface ContractIdState {
  contractId: string;
  setContractId: (contractId: string) => void;
}

export const useContractIdStore = create<ContractIdState>((set) => ({
  contractId: '',
  setContractId: (contractId: string) => set({ contractId }),
}));
