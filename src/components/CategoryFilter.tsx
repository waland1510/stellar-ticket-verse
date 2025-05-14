
import React from 'react';
import { categories } from '@/data/mockTickets';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="py-4 overflow-x-auto">
      <div className="flex space-x-2 min-w-max">
        <Button
          variant={!selectedCategory ? "default" : "outline"}
          className={!selectedCategory 
            ? "bg-stellar-primary text-white" 
            : "border-gray-300 text-gray-700"
          }
          onClick={() => onSelectCategory(null)}
        >
          All Categories
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={selectedCategory === category 
              ? "bg-stellar-primary text-white" 
              : "border-gray-300 text-gray-700 hover:border-stellar-primary hover:text-stellar-primary"
            }
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
