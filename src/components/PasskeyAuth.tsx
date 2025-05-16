
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { Key, UserPlus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PasskeyAuth: React.FC = () => {
  const { connectWithPasskey, isPasskeyAvailable } = useWallet();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await connectWithPasskey(username);
    setIsLoginModalOpen(false);
    setUsername('');
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await connectWithPasskey(username, displayName);
    setIsSignupModalOpen(false);
    setUsername('');
    setDisplayName('');
  };
  
  if (!isPasskeyAvailable) {
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
    <>
      <div className="flex flex-col space-y-4 w-full max-w-md mx-auto">
        <Button 
          className="py-6 bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => setIsLoginModalOpen(true)}
        >
          <Key className="mr-2" /> Login with passkey
        </Button>
        
        <Button 
          className="py-6 bg-yellow-400 hover:bg-yellow-500 text-gray-800"
          onClick={() => setIsSignupModalOpen(true)}
        >
          <UserPlus className="mr-2" /> Signup with passkey
        </Button>
      </div>
      
      {/* Login Modal */}
      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login with Passkey</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-username">Username</Label>
              <Input
                id="login-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
            <Button type="submit" className="w-full">Continue</Button>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Signup Modal */}
      <Dialog open={isSignupModalOpen} onOpenChange={setIsSignupModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Signup with Passkey</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-username">Username</Label>
              <Input
                id="signup-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="display-name">Display Name</Label>
              <Input
                id="display-name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your display name"
                required
              />
            </div>
            <Button type="submit" className="w-full">Create Account</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PasskeyAuth;
