
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockTickets } from '@/data/mockTickets';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useWallet } from '@/contexts/WalletContext';
import { buyTicket } from '@/utils/stellar';
import { toast } from "@/components/ui/sonner";
import { formatDate, truncateAddress } from '@/utils/format';

const TicketDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isConnected, connectWallet } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  
  const ticket = mockTickets.find(t => t.id === id);
  
  if (!ticket) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Ticket Not Found</h1>
            <p className="mb-6">The ticket you're looking for doesn't exist or has been removed.</p>
            <Link to="/marketplace">
              <Button>Back to Marketplace</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleBuyTicket = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await buyTicket(ticket.seller, ticket.id);
      toast.success("Ticket purchased successfully!");
    } catch (error) {
      console.error("Error purchasing ticket:", error);
      toast.error("Failed to purchase ticket");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto">
          <div className="mb-6">
            <Link to="/marketplace" className="text-stellar-primary hover:underline">
              ← Back to Marketplace
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="h-[300px] md:h-[400px] relative">
                  <img 
                    src={ticket.image} 
                    alt={ticket.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <Badge className="mb-2 bg-stellar-primary">{ticket.category}</Badge>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">{ticket.name}</h1>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="bg-gray-50 px-4 py-2 rounded-md">
                      <div className="text-sm text-gray-500">Date</div>
                      <div className="font-medium">{formatDate(ticket.date)}</div>
                    </div>
                    <div className="bg-gray-50 px-4 py-2 rounded-md">
                      <div className="text-sm text-gray-500">Time</div>
                      <div className="font-medium">{ticket.time}</div>
                    </div>
                    <div className="bg-gray-50 px-4 py-2 rounded-md">
                      <div className="text-sm text-gray-500">Available</div>
                      <div className="font-medium">{ticket.availableTickets} tickets</div>
                    </div>
                    <div className="bg-gray-50 px-4 py-2 rounded-md">
                      <div className="text-sm text-gray-500">Price</div>
                      <div className="font-medium text-stellar-primary">${ticket.price.toFixed(2)}</div>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-2">Event Details</h2>
                  <p className="text-gray-600 mb-4">
                    This ticket is for {ticket.name} at {ticket.venue}. Join thousands of fans for an unforgettable experience. This ticket is transferable and has been verified on the Stellar blockchain.
                  </p>
                  
                  <h2 className="text-xl font-semibold mb-2">Venue</h2>
                  <p className="text-gray-600 mb-4">{ticket.venue}</p>
                  
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-medium mb-1">Seller Information</h3>
                    <p className="text-gray-600 text-sm">
                      Stellar Address: {truncateAddress(ticket.seller)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="p-6 shadow-sm sticky top-6">
                <h2 className="text-xl font-bold mb-4">Purchase Tickets</h2>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Price per ticket</span>
                  <span className="font-semibold">${ticket.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4 pb-4 border-b">
                  <span className="text-gray-600">Blockchain fee</span>
                  <span className="font-semibold">$0.00001</span>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-bold text-stellar-primary">${ticket.price.toFixed(2)}</span>
                </div>
                
                {isConnected ? (
                  <Button 
                    className="w-full gradient-btn py-6 text-lg"
                    onClick={handleBuyTicket}
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Buy Now"}
                  </Button>
                ) : (
                  <Button 
                    className="w-full py-6 text-lg"
                    onClick={connectWallet}
                  >
                    Connect Wallet to Purchase
                  </Button>
                )}
                
                <p className="text-center text-gray-500 text-sm mt-4">
                  Secured by Stellar blockchain
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TicketDetail;
