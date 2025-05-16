
import { create } from 'zustand';

interface KeyIdState {
  keyId: string | null;
  setKeyId: (keyId: string) => void;
}

export const useKeyIdStore = create<KeyIdState>((set) => ({
  keyId: null,
  setKeyId: (keyId: string) => set({ keyId }),
}));
