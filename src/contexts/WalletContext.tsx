import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as freighter from '@stellar/freighter-api';
import { toast } from "@/components/ui/sonner";
import { useKeyIdStore } from '@/store/keyId';
import { useContractIdStore } from '@/store/contractId';
import { isPasskeySupported } from '@/utils/passkey';

interface WalletContextType {
  isConnected: boolean;
  publicKey: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isPasskeyAvailable: boolean;
  connectWithPasskey: (username: string, displayName?: string) => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  publicKey: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  isPasskeyAvailable: false,
  connectWithPasskey: async () => {},
});

export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isPasskeyAvailable, setIsPasskeyAvailable] = useState(false);
  
  // Use our stores
  const contractId = useContractIdStore((state) => state.contractId);
  const updateContractId = useContractIdStore((state) => state.setContractId);

  useEffect(() => {
    // Check if wallet is already connected
    const checkConnection = async () => {
      try {
        // First check for Freighter wallet
        const isAvailable = await freighter.isConnected();
        if (isAvailable) {
          const publicKey = await freighter.getPublicKey();
          setIsConnected(true);
          setPublicKey(publicKey);
          return;
        }
        
        // Then check for passkey connection through contractId from the store
        if (contractId) {
          setIsConnected(true);
          setPublicKey(contractId);
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    };

    // Check if passkeys are supported
    setIsPasskeyAvailable(isPasskeySupported());
    
    checkConnection();
  }, [contractId]);

  const connectWallet = async () => {
    try {
      // Check if Freighter is available in the browser
      if (!(await freighter.isConnected())) {
        toast.error("Freighter wallet is not available. Please install the extension.");
        window.open("https://www.freighter.app/", "_blank");
        return;
      }

      // Request permission to connect to the user's Stellar account
      try {
        const publicKey = await freighter.getPublicKey();
        
        setIsConnected(true);
        setPublicKey(publicKey);
        toast.success("Wallet connected successfully!");
      } catch (error) {
        toast.error("User rejected the connection request");
        console.error("Error connecting:", error);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet");
    }
  };

  // This is now a simplified method that delegates to PasskeyAuth
  const connectWithPasskey = async (username: string, displayName?: string) => {
    // This functionality is now directly handled by the PasskeyAuth component
    // We keep this method for backward compatibility
    toast.info("Please use the login/signup buttons in the header");
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setPublicKey(null);
    
    // Clear contractId in the store
    updateContractId('');
    
    // Clear localStorage items
    Object.keys(localStorage).forEach((key) => {
      if (key.includes("stellartix:")) {
        localStorage.removeItem(key);
      }
    });
    
    // Clear sessionStorage items
    Object.keys(sessionStorage).forEach((key) => {
      if (key.includes("stellartix:")) {
        sessionStorage.removeItem(key);
      }
    });
    
    toast.success("Wallet disconnected");
  };

  return (
    <WalletContext.Provider value={{ 
      isConnected, 
      publicKey, 
      connectWallet, 
      disconnectWallet,
      isPasskeyAvailable,
      connectWithPasskey
    }}>
      {children}
    </WalletContext.Provider>
  );
};
