
import React from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedTickets from '@/components/FeaturedTickets';
import HowItWorks from '@/components/HowItWorks';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <FeaturedTickets />
        <HowItWorks />
        
        {/* Benefits Section */}
        <section className="py-16 bg-stellar-accent">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Why Use Blockchain For Tickets?</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-4 text-stellar-primary text-xl">✓</div>
                    <div>
                      <h3 className="font-semibold text-lg">No Middlemen</h3>
                      <p className="text-gray-600">Direct peer-to-peer sales mean lower fees and better prices for everyone.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 text-stellar-primary text-xl">✓</div>
                    <div>
                      <h3 className="font-semibold text-lg">Fraud Prevention</h3>
                      <p className="text-gray-600">Blockchain verification ensures tickets are authentic and can't be duplicated.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 text-stellar-primary text-xl">✓</div>
                    <div>
                      <h3 className="font-semibold text-lg">Transparent History</h3>
                      <p className="text-gray-600">See the full history of a ticket, including previous owners and prices.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 text-stellar-primary text-xl">✓</div>
                    <div>
                      <h3 className="font-semibold text-lg">Fast Transfers</h3>
                      <p className="text-gray-600">Instant settlement on the Stellar network means no waiting for tickets.</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link to="/about">
                    <Button className="gradient-btn px-6 py-2">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Concert crowd" 
                  className="w-full h-full object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-stellar-primary to-stellar-dark text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Buy or Sell Tickets?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our secure marketplace today and experience the future of ticket reselling.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/marketplace">
                <Button className="px-8 py-6 text-lg bg-white text-stellar-primary hover:bg-gray-100">
                  Browse Marketplace
                </Button>
              </Link>
              <Link to="/sell">
                <Button variant="outline" className="px-8 py-6 text-lg border-white text-white hover:bg-white/10">
                  Sell Your Tickets
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

export default Index;
