
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-stellar-primary to-stellar-dark text-white py-20">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About StellarTix</h1>
            <p className="text-xl max-w-3xl mx-auto">
              We're revolutionizing ticket reselling with blockchain technology, making it secure, transparent, and commission-free.
            </p>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-600 mb-4">
                  StellarTix was founded with a simple mission: to make ticket reselling fair, transparent, and secure for everyone.
                </p>
                <p className="text-gray-600 mb-4">
                  We believe that blockchain technology, specifically the Stellar network, provides the perfect solution to the problems that have plagued the secondary ticket market for years – fraud, excessive fees, and lack of transparency.
                </p>
                <p className="text-gray-600">
                  By leveraging the Stellar blockchain, we've created a platform where tickets can be bought and sold directly between users, with ownership securely recorded on the blockchain, eliminating fraud and middlemen.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1556742031-c6961e8560b0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Concert venue" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Stellar Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Why We Chose Stellar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-stellar-primary text-3xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold mb-3">Fast & Affordable</h3>
                <p className="text-gray-600">
                  Stellar transactions are confirmed in seconds and cost fractions of a penny, making it perfect for ticket sales.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-stellar-primary text-3xl mb-4">🌐</div>
                <h3 className="text-xl font-semibold mb-3">Global Access</h3>
                <p className="text-gray-600">
                  Stellar is designed for global financial inclusion, allowing users worldwide to participate in our marketplace.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-stellar-primary text-3xl mb-4">🛡️</div>
                <h3 className="text-xl font-semibold mb-3">Secure & Reliable</h3>
                <p className="text-gray-600">
                  With its robust consensus mechanism, Stellar provides secure, immutable records of ticket ownership.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How it Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">How StellarTix Works</h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[15px] md:left-1/2 ml-[-1px] w-[2px] h-full bg-gray-200"></div>
                
                {/* Timeline items */}
                <div className="space-y-12">
                  {/* Item 1 */}
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 pr-0 md:pr-8 text-right hidden md:block">
                      <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
                      <p className="text-gray-600">
                        Users connect their Stellar wallet (like Freighter) to start buying or selling tickets.
                      </p>
                    </div>
                    <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-stellar-primary text-white font-bold ml-1 md:mx-auto">
                      1
                    </div>
                    <div className="md:w-1/2 pl-12 md:pl-8 md:hidden">
                      <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
                      <p className="text-gray-600">
                        Users connect their Stellar wallet (like Freighter) to start buying or selling tickets.
                      </p>
                    </div>
                  </div>
                  
                  {/* Item 2 */}
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 pr-0 md:pr-8 text-right hidden md:block"></div>
                    <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-stellar-primary text-white font-bold ml-1 md:mx-auto">
                      2
                    </div>
                    <div className="md:w-1/2 pl-12 md:pl-8">
                      <h3 className="text-xl font-semibold mb-2">List or Browse Tickets</h3>
                      <p className="text-gray-600">
                        Sellers can list their tickets with details and set prices, while buyers can browse available tickets.
                      </p>
                    </div>
                  </div>
                  
                  {/* Item 3 */}
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 pr-0 md:pr-8 text-right hidden md:block">
                      <h3 className="text-xl font-semibold mb-2">Secure Purchase</h3>
                      <p className="text-gray-600">
                        When a buyer purchases a ticket, the transaction is executed on the Stellar blockchain, ensuring secure transfer of both funds and ticket ownership.
                      </p>
                    </div>
                    <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-stellar-primary text-white font-bold ml-1 md:mx-auto">
                      3
                    </div>
                    <div className="md:w-1/2 pl-12 md:pl-8 md:hidden">
                      <h3 className="text-xl font-semibold mb-2">Secure Purchase</h3>
                      <p className="text-gray-600">
                        When a buyer purchases a ticket, the transaction is executed on the Stellar blockchain, ensuring secure transfer of both funds and ticket ownership.
                      </p>
                    </div>
                  </div>
                  
                  {/* Item 4 */}
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 pr-0 md:pr-8 text-right hidden md:block"></div>
                    <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-stellar-primary text-white font-bold ml-1 md:mx-auto">
                      4
                    </div>
                    <div className="md:w-1/2 pl-12 md:pl-8">
                      <h3 className="text-xl font-semibold mb-2">Enjoy Your Event</h3>
                      <p className="text-gray-600">
                        The buyer now has verifiable proof of ticket ownership on the blockchain and can attend the event with confidence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-stellar-accent">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Join the Future of Ticket Reselling?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700">
              Experience secure, transparent ticket transactions with StellarTix.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/marketplace">
                <Button className="gradient-btn px-8 py-2 text-lg">
                  Explore Marketplace
                </Button>
              </Link>
              <Link to="/sell">
                <Button variant="outline" className="px-8 py-2 text-lg border-stellar-primary text-stellar-primary hover:bg-stellar-accent/50">
                  Sell Tickets
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
