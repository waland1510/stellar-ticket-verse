
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Ticket } from '@/data/mockTickets';
import { Link } from 'react-router-dom';
import { formatDate } from '@/utils/format';

interface TicketCardProps {
  ticket: Ticket;
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  return (
    <Card className="ticket-card h-full flex flex-col transition-transform hover:scale-[1.01]">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={ticket.image} 
          alt={ticket.name}
          className="w-full h-full object-cover"
        />
        <Badge 
          className="absolute top-3 right-3 bg-stellar-primary text-white"
        >
          {ticket.category}
        </Badge>
      </div>
      <CardContent className="pt-4 flex-1">
        <h3 className="font-bold text-lg line-clamp-1">{ticket.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{ticket.venue}</p>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-500">{formatDate(ticket.date)}</span>
          <span className="text-sm text-gray-500">{ticket.time}</span>
        </div>
        <div className="mt-2">
          <span className="font-medium text-stellar-primary text-lg">${ticket.price.toFixed(2)}</span>
          <span className="text-xs text-gray-500 ml-2">
            {ticket.availableTickets} tickets left
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Link to={`/ticket/${ticket.id}`} className="w-full">
          <Button 
            className="w-full gradient-btn"
          >
            View Tickets
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TicketCard;
