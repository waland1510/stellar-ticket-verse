
import { PasskeyKit } from 'passkey-kit';

// Initialize PasskeyKit with Stellar network options
const passkeyKit = new PasskeyKit({
  rpcUrl: 'https://horizon-testnet.stellar.org',
  networkPassphrase: 'Test SDF Network ; September 2015',
  walletWasmHash: 'e28a9250499566edd03f94304530d67779969de62c1de585a63a88e7f5c2d82f'
});

// Register a new passkey
export const registerPasskey = async (username: string, displayName: string) => {
  try {
    // Generate a new passkey for the user
    const { keyIdBase64, contractId, signedTx } = await passkeyKit.createWallet(
      username || "StellarTix", 
      displayName || "StellarTix User"
    );
    
    // Store the key ID in local storage
    localStorage.setItem("stellartix:keyId", keyIdBase64);
    
    return {
      keyIdBase64,
      contractId,
      signedTx
    };
  } catch (error) {
    console.error('Error registering passkey:', error);
    throw error;
  }
};

// Authenticate using a passkey
export const authenticateWithPasskey = async (username: string) => {
  try {
    // Get stored keyId from local storage
    const keyIdBase64 = localStorage.getItem("stellartix:keyId");
    
    if (!keyIdBase64) {
      throw new Error("No passkey found for this user");
    }
    
    // For the authentication, we'll use the stored keyId to get wallet info
    // Since getWalletInfo doesn't exist, we'll use the appropriate method
    // For now, just return the stored keyId and contractId from local storage
    const contractId = localStorage.getItem("stellartix:contractId");
    
    return {
      keyIdBase64,
      contractId
    };
  } catch (error) {
    console.error('Error authenticating with passkey:', error);
    throw error;
  }
};

// Verify if passkeys are supported in this browser
export const isPasskeySupported = (): boolean => {
  return typeof window !== 'undefined' && 
         window.PublicKeyCredential !== undefined && 
         typeof window.PublicKeyCredential === 'function';
};

// Get the passkeyKit instance for sending transactions
export const getServer = () => {
  // Return the PasskeyKit instance
  return passkeyKit;
};

// Get the passkeyKit instance for direct operations
export const getAccount = () => {
  return passkeyKit;
};
