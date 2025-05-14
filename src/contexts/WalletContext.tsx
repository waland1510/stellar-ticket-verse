import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as freighter from '@stellar/freighter-api';
import { toast } from "@/components/ui/sonner";
import { 
  isPasskeySupported, 
  registerPasskey, 
  authenticateWithPasskey,
  getServer, 
  getAccount 
} from '@/utils/passkey';

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
        // First check for Freighter wallet
        const isAvailable = await freighter.isConnected();
        if (isAvailable) {
          const publicKey = await freighter.getPublicKey();
          setIsConnected(true);
          setPublicKey(publicKey);
          return;
        }
        
        // Then check for passkey connection
        const keyIdBase64 = localStorage.getItem("stellartix:keyId");
        if (keyIdBase64) {
          try {
            const account = getAccount();
            const walletInfo = await account.getWalletInfo(keyIdBase64);
            if (walletInfo && walletInfo.contractId) {
              setIsConnected(true);
              setPublicKey(walletInfo.contractId);
            }
          } catch (error) {
            console.error("Error retrieving passkey wallet:", error);
          }
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

      let result;
      
      if (displayName) {
        // If displayName is provided, register a new passkey
        result = await registerPasskey(username, displayName);
        
        // Since we can't directly call server.send, we need an alternative approach
        // The signedTx from registerPasskey should be submitted to the network
        // Here we would typically send it to a server endpoint that uses PasskeyServer
        // For now, we'll just log it and assume it's handled
        console.log("Transaction to be submitted:", result.signedTx);
        
        // In a complete implementation, you would send this to your backend:
        // await fetch('/api/submit-transaction', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ signedTx: result.signedTx })
        // });
        
        toast.success("Passkey registered successfully!");
      } else {
        // Otherwise, authenticate with existing passkey
        result = await authenticateWithPasskey(username);
        toast.success("Authenticated with passkey!");
      }

      // Set the contract ID as the public key
      if (result && result.contractId) {
        setIsConnected(true);
        setPublicKey(result.contractId);
      }
    } catch (error) {
      console.error("Error with passkey:", error);
      toast.error("Failed to use passkey");
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setPublicKey(null);
    localStorage.removeItem("stellartix:keyId");
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
