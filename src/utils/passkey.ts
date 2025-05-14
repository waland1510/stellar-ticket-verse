
import { PasskeyKit } from 'passkey-kit';

// Initialize PasskeyKit
const passkeyKit = new PasskeyKit();

// Register a new passkey
export const registerPasskey = async (username: string, displayName: string) => {
  try {
    // Generate a new passkey for the user
    const credential = await passkeyKit.register({
      username,
      displayName,
      attestation: 'direct',
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
    const assertion = await passkeyKit.authenticate({
      username,
    });
    
    return assertion;
  } catch (error) {
    console.error('Error authenticating with passkey:', error);
    throw error;
  }
};

// Verify if passkeys are supported in this browser
export const isPasskeySupported = (): boolean => {
  return passkeyKit.isSupported();
};
