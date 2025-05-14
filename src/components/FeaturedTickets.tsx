
import React from 'react';
import TicketCard from './TicketCard';
import { mockTickets } from '@/data/mockTickets';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FeaturedTickets: React.FC = () => {
  // Get just the first 3 tickets for featured section
  const featuredTickets = mockTickets.slice(0, 3);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Featured Tickets</h2>
          <Link to="/marketplace">
            <Button variant="link" className="text-stellar-primary">
              View All Tickets
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTickets;
