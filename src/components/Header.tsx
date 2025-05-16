
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { WalletCards } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import PasskeyAuth from './PasskeyAuth';
import { useContractIdStore } from '@/store/contractId';
import { truncate } from '@/utils/base';

const Header: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const contractId = useContractIdStore((state) => state.contractId);
  const updateContractId = useContractIdStore((state) => state.setContractId);

  function logout() {
    updateContractId('');

    // Clear all localStorage items related to our app
    Object.keys(localStorage).forEach((key) => {
      if (key.includes("stellartix:")) {
        localStorage.removeItem(key);
      }
    });

    // Clear all sessionStorage items related to our app
    Object.keys(sessionStorage).forEach((key) => {
      if (key.includes("stellartix:")) {
        sessionStorage.removeItem(key);
      }
    });
  }

  return (
    <header className="bg-white border-b py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <WalletCards className="h-8 w-8 text-stellar-primary" />
          <span className="text-2xl font-bold bg-gradient-to-r from-stellar-light to-stellar-primary bg-clip-text text-transparent">
            StellarTix
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-stellar-primary transition-colors">
            Home
          </Link>
          <Link to="/marketplace" className="text-gray-700 hover:text-stellar-primary transition-colors">
            Marketplace
          </Link>
          <Link to="/sell" className="text-gray-700 hover:text-stellar-primary transition-colors">
            Sell Tickets
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-stellar-primary transition-colors">
            About
          </Link>
        </nav>
        
        <div>
          {contractId ? (
            <div className="flex items-center space-x-4">
              <a
                className="text-sm text-gray-500 underline hidden md:inline-block"
                href={`https://stellar.expert/explorer/testnet/contract/${contractId}`}
                target="_blank"
                rel="noreferrer"
              >
                {truncate(contractId, 4)}
              </a>
              <Button 
                variant="outline" 
                onClick={logout}
                className="border-stellar-primary text-stellar-primary hover:bg-stellar-accent hover:text-stellar-primary"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => setIsAuthModalOpen(true)}
              className="gradient-btn px-4 py-2"
            >
              Login / Signup
            </Button>
          )}
        </div>
      </div>
      
      {/* Auth Modal */}
      <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-center">Login or Register</DialogTitle>
          </DialogHeader>
          <p className="text-center text-gray-600 mb-4">
            Securely access your NFT tickets using passkeys
          </p>
          <PasskeyAuth />
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
