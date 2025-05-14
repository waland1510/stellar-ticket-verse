import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as freighter from '@stellar/freighter-api';
import { toast } from "@/components/ui/sonner";
import { isPasskeySupported, registerPasskey, authenticateWithPasskey } from '@/utils/passkey';

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

    // Check if passkeys are supported
    setIsPasskeyAvailable(isPasskeySupported());
    
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

  const connectWithPasskey = async (username: string, displayName?: string) => {
    try {
      if (!isPasskeyAvailable) {
        toast.error("Passkeys are not supported in this browser");
        return;
      }

      let credential;
      
      if (displayName) {
        // If displayName is provided, register a new passkey
        credential = await registerPasskey(username, displayName);
        toast.success("Passkey registered successfully!");
      } else {
        // Otherwise, authenticate with existing passkey
        credential = await authenticateWithPasskey(username);
        toast.success("Authenticated with passkey!");
      }

      // In a real application, you would use this credential to authenticate with your backend
      // and retrieve the associated Stellar account information
      
      // For now, we'll just set a dummy public key
      const dummyPublicKey = "GBDFDUMMYPASSKEYPUBLICKEY000000000000000";
      setIsConnected(true);
      setPublicKey(dummyPublicKey);
    } catch (error) {
      console.error("Error with passkey:", error);
      toast.error("Failed to use passkey");
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setPublicKey(null);
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
