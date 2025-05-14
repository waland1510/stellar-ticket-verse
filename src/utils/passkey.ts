
import { PasskeyKit } from 'passkey-kit';

// Initialize PasskeyKit with default options
const passkeyKit = new PasskeyKit({
  rpID: window.location.hostname,
  rpName: 'StellarTix'
});

// Register a new passkey
export const registerPasskey = async (username: string, displayName: string) => {
  try {
    // Generate a new passkey for the user
    const credential = await passkeyKit.create({
      username,
      displayName,
      authenticatorSelection: {
        residentKey: 'required',
        userVerification: 'preferred'
      }
    });
    
    return credential;
  } catch (error) {
    console.error('Error registering passkey:', error);
    throw error;
  }
};

// Authenticate using a passkey
export const authenticateWithPasskey = async (username: string) => {
  try {
    // Authenticate with existing passkey
    const assertion = await passkeyKit.get({
      username
    });
    
    return assertion;
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
