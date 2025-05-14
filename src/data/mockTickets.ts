
export interface Ticket {
  id: string;
  name: string;
  venue: string;
  date: string;
  time: string;
  price: number;
  seller: string;
  category: string;
  image: string;
  availableTickets: number;
}

export const categories = [
  "Concerts",
  "Sports",
  "Theater",
  "Festivals",
  "Comedy",
  "Other"
];

export const mockTickets: Ticket[] = [
  {
    id: "1",
    name: "Taylor Swift - The Eras Tour",
    venue: "SoFi Stadium, Los Angeles",
    date: "2025-05-25",
    time: "7:00 PM",
    price: 250,
    seller: "GDQJSXE4XVFN3GW3WQ6YFDKCVVHZZFBDPQBPTGVXDDNLF5733NNZKC47",
    category: "Concerts",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3",
    availableTickets: 4
  },
  {
    id: "2",
    name: "Lakers vs. Warriors",
    venue: "Crypto.com Arena, Los Angeles",
    date: "2025-06-10",
    time: "8:30 PM",
    price: 180,
    seller: "GDQJSXE4XVFN3GW3WQ6YFDKCVVHZZFBDPQBPTGVXDDNLF5733NNZKC48",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2796&auto=format&fit=crop&ixlib=rb-4.0.3",
    availableTickets: 2
  },
  {
    id: "3",
    name: "Hamilton",
    venue: "Pantages Theatre, Los Angeles",
    date: "2025-07-15",
    time: "7:30 PM",
    price: 300,
    seller: "GDQJSXE4XVFN3GW3WQ6YFDKCVVHZZFBDPQBPTGVXDDNLF5733NNZKC49",
    category: "Theater",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3",
    availableTickets: 6
  },
  {
    id: "4",
    name: "Coachella Music Festival",
    venue: "Empire Polo Club, Indio",
    date: "2025-04-10",
    time: "12:00 PM",
    price: 450,
    seller: "GDQJSXE4XVFN3GW3WQ6YFDKCVVHZZFBDPQBPTGVXDDNLF5733NNZKC50",
    category: "Festivals",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3",
    availableTickets: 3
  },
  {
    id: "5",
    name: "Dave Chappelle",
    venue: "The Comedy Store, Los Angeles",
    date: "2025-05-30",
    time: "9:00 PM",
    price: 150,
    seller: "GDQJSXE4XVFN3GW3WQ6YFDKCVVHZZFBDPQBPTGVXDDNLF5733NNZKC51",
    category: "Comedy",
    image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=2731&auto=format&fit=crop&ixlib=rb-4.0.3",
    availableTickets: 8
  },
  {
    id: "6",
    name: "Beyoncé - Renaissance Tour",
    venue: "MetLife Stadium, New Jersey",
    date: "2025-08-15",
    time: "8:00 PM",
    price: 280,
    seller: "GDQJSXE4XVFN3GW3WQ6YFDKCVVHZZFBDPQBPTGVXDDNLF5733NNZKC52",
    category: "Concerts",
    image: "https://images.unsplash.com/photo-1618008074158-6d019e7d9660?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3",
    availableTickets: 5
  }
];
