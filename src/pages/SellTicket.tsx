
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useWallet } from '@/contexts/WalletContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from '@/data/mockTickets';
import { toast } from "@/components/ui/sonner";
import { listTicketForSale } from '@/utils/stellar';

const SellTicket = () => {
  const { isConnected, connectWallet } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    venue: '',
    date: '',
    time: '',
    price: '',
    category: '',
    quantity: '1',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    // Form validation
    if (
      !formData.name ||
      !formData.venue ||
      !formData.date ||
      !formData.time ||
      !formData.price ||
      !formData.category
    ) {
      toast.error("Please fill out all fields");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await listTicketForSale({
        name: formData.name,
        venue: formData.venue,
        date: formData.date,
        price: formData.price,
        category: formData.category,
      });
      
      toast.success("Ticket listed successfully!");
      
      // Reset form
      setFormData({
        name: '',
        venue: '',
        date: '',
        time: '',
        price: '',
        category: '',
        quantity: '1',
      });
    } catch (error) {
      console.error("Error listing ticket:", error);
      toast.error("Failed to list ticket");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Sell Your Tickets</h1>
            
            {!isConnected ? (
              <Card className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
                <p className="text-gray-600 mb-6">
                  You need to connect your Stellar wallet to list tickets for sale.
                </p>
                <Button 
                  className="gradient-btn py-6 px-8 text-lg"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </Button>
              </Card>
            ) : (
              <Card className="p-8">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Event Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="e.g. Taylor Swift Concert"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="venue">Venue</Label>
                      <Input
                        id="venue"
                        name="venue"
                        placeholder="e.g. Madison Square Garden"
                        value={formData.venue}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleSelectChange('category', value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="price">Price per Ticket (USD)</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Number of Tickets</Label>
                      <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        min="1"
                        max="10"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="border-t pt-6 mt-6">
                    <Button 
                      type="submit" 
                      className="w-full gradient-btn py-6 text-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Listing Ticket..." : "List Tickets for Sale"}
                    </Button>
                    <p className="text-center text-gray-500 text-sm mt-4">
                      By listing your tickets, you agree to our Terms of Service.
                    </p>
                  </div>
                </form>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SellTicket;
