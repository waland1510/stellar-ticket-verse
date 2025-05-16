
import { PasskeyKit, PasskeyServer } from "passkey-kit";

// Hardcoded values since we don't have environment variables in this setup
const RPC_URL = "https://soroban-testnet.stellar.org";
const NETWORK_PASSPHRASE = "Test SDF Network ; September 2015";
const WASM_HASH = "686dfd0a069a826d19c3ccf441a984c7ddb666dbeb64dfed2db62df6...2f";
const CONTRACT_ID = "CAWSIHRK6FF2R2AWQT6HRO7RJYV5SPFKTAUZFEXFWD5COPTEAAVK62QP";
const LAUNCHTUBE_URL = "https://testnet.launchtube.xyz";
const LAUNCHTUBE_JWT = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlYjg0MWFmOThjODAyODZjOGFkNWJmZjJhYzJiMGJjNGQxMTEzZDUxZjgxYTljODRjNWU3MTNkZGVkODE3YTNhIiwiZXhwIjoxNzU0NDk5OTA1LCJjcmVkaXRzIjoxMDAwMDAwMDAwLCJpYXQiOjE3NDcyNDIzMDV9.6EJq15Kq6LjrwG5_zkiKh4wEuVa9Oimf-9Dk7HW-LMk";

// Initialize PasskeyKit with hardcoded values
export const account = new PasskeyKit({
  rpcUrl: RPC_URL,
  networkPassphrase: NETWORK_PASSPHRASE,
  walletWasmHash: WASM_HASH,
  timeoutInSeconds: 30,
});

// Initialize server for sending transactions
export const server = new PasskeyServer({
  rpcUrl: RPC_URL,
  launchtubeUrl: LAUNCHTUBE_URL,
  launchtubeJwt: LAUNCHTUBE_JWT,
});

// Verify if passkeys are supported in this browser
export const isPasskeySupported = (): boolean => {
  return typeof window !== 'undefined' && 
         window.PublicKeyCredential !== undefined && 
         typeof window.PublicKeyCredential === 'function';
};
