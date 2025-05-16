
import { PasskeyKit } from 'passkey-kit';

// Initialize PasskeyKit with Stellar network options
export const account = new PasskeyKit({
  rpcUrl: 'https://horizon-testnet.stellar.org',
  networkPassphrase: 'Test SDF Network ; September 2015',
  walletWasmHash: 'e28a9250499566edd03f94304530d67779969de62c1de585a63a88e7f5c2d82f'
});

// Initialize server for sending transactions
// In a production app, this would be handled by a backend service
export const server = {
  send: async (signedTx: any) => {
    // Convert Tx object to string if needed
    const txString = typeof signedTx === 'string' ? signedTx : JSON.stringify(signedTx);
    console.log("Transaction to be submitted:", txString);
    // In a full implementation, this would send the transaction to a backend endpoint
    return Promise.resolve(); // Mock successful transaction
  }
};

// Verify if passkeys are supported in this browser
export const isPasskeySupported = (): boolean => {
  return typeof window !== 'undefined' && 
         window.PublicKeyCredential !== undefined && 
         typeof window.PublicKeyCredential === 'function';
};
