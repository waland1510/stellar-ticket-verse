
import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: "Connect Wallet",
      description: "Connect your Stellar wallet securely to start buying or selling tickets.",
      icon: "💳"
    },
    {
      title: "Browse & Buy",
      description: "Find the perfect event and purchase tickets directly from sellers with zero fees.",
      icon: "🔍"
    },
    {
      title: "List Your Tickets",
      description: "Easily list your tickets for sale and set your own price.",
      icon: "📝"
    },
    {
      title: "Secure Transfer",
      description: "Tickets are transferred securely on the Stellar blockchain providing proof of ownership.",
      icon: "🔒"
    }
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            StellarTix makes ticket reselling simple, secure, and transparent using blockchain technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-4 bg-stellar-accent w-16 h-16 flex items-center justify-center rounded-full mx-auto">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              <div className="mt-4 text-stellar-primary font-medium">Step {index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
