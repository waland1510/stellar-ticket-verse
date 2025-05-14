
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TicketCard from '@/components/TicketCard';
import CategoryFilter from '@/components/CategoryFilter';
import { mockTickets } from '@/data/mockTickets';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  
  const filteredTickets = mockTickets.filter(ticket => {
    // Apply category filter
    if (selectedCategory && ticket.category !== selectedCategory) {
      return false;
    }
    
    // Apply search filter (case insensitive)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        ticket.name.toLowerCase().includes(query) ||
        ticket.venue.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Apply sorting
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'date-asc':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'date-desc':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      default:
        return 0;
    }
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">Ticket Marketplace</h1>
          
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="col-span-2">
                <Input
                  placeholder="Search for events, venues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <Select
                  value={sortOption}
                  onValueChange={(value) => setSortOption(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="date-asc">Date: Soonest</SelectItem>
                    <SelectItem value="date-desc">Date: Latest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
          
          {sortedTickets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600">No tickets found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
