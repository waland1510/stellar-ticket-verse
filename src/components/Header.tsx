
import React from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { Link } from 'react-router-dom';
import { WalletCards } from 'lucide-react';

const Header: React.FC = () => {
  const { isConnected, publicKey, connectWallet, disconnectWallet } = useWallet();

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
          {isConnected ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 hidden md:inline-block">
                {publicKey?.slice(0, 6)}...{publicKey?.slice(-4)}
              </span>
              <Button 
                variant="outline" 
                onClick={disconnectWallet}
                className="border-stellar-primary text-stellar-primary hover:bg-stellar-accent hover:text-stellar-primary"
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <Button 
              onClick={connectWallet}
              className="gradient-btn px-4 py-2"
            >
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
