
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Key, UserPlus } from 'lucide-react';
import { account, server, isPasskeySupported } from '@/utils/passkey';
import { useKeyIdStore } from '@/store/keyId';
import { useContractIdStore } from '@/store/contractId';
import { toast } from "@/components/ui/sonner";

const PasskeyAuth: React.FC = () => {
  const [creating, setCreating] = useState(false);
  const updateKeyId = useKeyIdStore((state) => state.setKeyId);
  const updateContractId = useContractIdStore((state) => state.setContractId);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    setIsAvailable(isPasskeySupported());
    
    // Check and load existing keyId from localStorage
    if (localStorage.hasOwnProperty("stellartix:keyId")) {
      updateKeyId(localStorage.getItem("stellartix:keyId")!);
    }
  }, [updateKeyId]);

  async function signUp() {
    setCreating(true);

    try {
      const { 
        keyIdBase64,
        contractId,
        signedTx,
      } = await account.createWallet("StellarTix", "StellarTix User");
      
      console.log({keyIdBase64, contractId, signedTx});
      
      // Send the signed transaction
      await server.send(signedTx);

      // Save keyId to localStorage and update state
      updateKeyId(keyIdBase64);
      localStorage.setItem("stellartix:keyId", keyIdBase64);

      // Update contract ID
      updateContractId(contractId);
      localStorage.setItem("stellartix:contractId", contractId);
      
      toast.success("Account created successfully!");
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("Failed to create account");
    } finally {
      setCreating(false);
    }
  }

  async function login() {
    try {
      console.log({account});
      
      const { keyIdBase64, contractId } = await account.connectWallet();

      // Save keyId to localStorage and update state
      updateKeyId(keyIdBase64);
      localStorage.setItem("stellartix:keyId", keyIdBase64);

      // Update contract ID
      updateContractId(contractId);
      localStorage.setItem("stellartix:contractId", contractId);
      
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Failed to login");
    }
  }

  if (!isAvailable) {
    return (
      <div className="text-center py-6">
        <p className="text-red-500">Passkeys are not supported in this browser.</p>
        <Button onClick={() => window.location.href = "https://caniuse.com/webauthn"} className="mt-2">
          Learn More
        </Button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col space-y-4 w-full max-w-md mx-auto">
      <Button 
        className="py-6 bg-stellar-primary hover:bg-stellar-primary/90 text-white"
        onClick={login}
      >
        <Key className="mr-2" /> Login with passkey
      </Button>
      
      <Button 
        className="py-6 bg-stellar-accent hover:bg-stellar-accent/90 text-stellar-primary"
        onClick={signUp}
        disabled={creating}
      >
        <UserPlus className="mr-2" /> {creating ? "Creating..." : "Create New Account"}
      </Button>
    </div>
  );
};

export default PasskeyAuth;
