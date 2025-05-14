
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <div className="relative">
      <div 
        className="absolute inset-0 bg-gradient-to-r from-stellar-dark/70 to-stellar-primary/70 z-10"
      />
      <div 
        className="h-[600px] bg-cover bg-center" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3')` 
        }}
      >
        <div className="container mx-auto h-full flex items-center relative z-20">
          <div className="max-w-lg text-white">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Secure Ticket Reselling with Blockchain
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Buy and sell event tickets securely using Stellar blockchain technology. No middlemen, no fraud.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/marketplace">
                <Button 
                  className="px-8 py-6 text-lg bg-white text-stellar-primary hover:bg-gray-100"
                >
                  Browse Tickets
                </Button>
              </Link>
              <Link to="/sell">
                <Button 
                  variant="outline" 
                  className="px-8 py-6 text-lg border-white text-white hover:bg-white/10"
                >
                  Sell Tickets
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
