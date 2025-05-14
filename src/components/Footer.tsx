
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-stellar-primary">StellarTix</h3>
            <p className="text-gray-600 text-sm">
              The secure, decentralized marketplace for ticket reselling using Stellar blockchain technology.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4 text-gray-700">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-stellar-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-gray-600 hover:text-stellar-primary transition-colors">
                  Browse Tickets
                </Link>
              </li>
              <li>
                <Link to="/sell" className="text-gray-600 hover:text-stellar-primary transition-colors">
                  Sell Your Tickets
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-stellar-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4 text-gray-700">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-stellar-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-stellar-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-stellar-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-stellar-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4 text-gray-700">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-stellar-primary transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-600 hover:text-stellar-primary transition-colors">
                Discord
              </a>
              <a href="#" className="text-gray-600 hover:text-stellar-primary transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} StellarTix. All rights reserved.</p>
          <p className="mt-2">Built on the Stellar blockchain network.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
