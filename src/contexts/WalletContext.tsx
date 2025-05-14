
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as freighter from '@stellar/freighter-api';
import { toast } from "@/components/ui/sonner";

interface WalletContextType {
  isConnected: boolean;
  publicKey: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  publicKey: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
});

export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  useEffect(() => {
    // Check if wallet is already connected
    const checkConnection = async () => {
      try {
        const isAvailable = await freighter.isConnected();
        if (isAvailable) {
          const publicKey = await freighter.getPublicKey();
          setIsConnected(true);
          setPublicKey(publicKey);
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    };

    checkConnection();
  }, []);

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

  const disconnectWallet = () => {
    setIsConnected(false);
    setPublicKey(null);
    toast.success("Wallet disconnected");
  };

  return (
    <WalletContext.Provider value={{ isConnected, publicKey, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
