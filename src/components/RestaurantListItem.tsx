import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star, Clock } from 'lucide-react'; // Icons for rating and delivery time

interface RestaurantListItemProps {
  id: string | number;
  name: string;
  imageUrl: string;
  cuisineTypes: string[];
  rating: number; // e.g., 4.5
  deliveryTimeEstimate: string; // e.g., "25-35 min"
  onClick?: (id: string | number) => void;
}

const RestaurantListItem: React.FC<RestaurantListItemProps> = ({
  id,
  name,
  imageUrl,
  cuisineTypes,
  rating,
  deliveryTimeEstimate,
  onClick,
}) => {
  console.log("Rendering RestaurantListItem:", name);

  const handleCardClick = () => {
    if (onClick) {
      console.log("RestaurantListItem clicked:", id);
      onClick(id);
    }
  };

  return (
    <Card
      className={`w-full overflow-hidden transition-shadow duration-300 hover:shadow-xl ${onClick ? 'cursor-pointer' : ''}`}
      onClick={handleCardClick}
    >
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <CardTitle className="text-lg font-semibold line-clamp-1">{name}</CardTitle>
        <div className="flex flex-wrap gap-1">
          {cuisineTypes.slice(0, 3).map((cuisine) => ( // Show max 3 cuisine types
            <Badge key={cuisine} variant="secondary" className="text-xs">
              {cuisine}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600 pt-1">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
            <span>{rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{deliveryTimeEstimate}</span>
          </div>
        </div>
      </CardContent>
      {/* Optional: Add a footer for promotions or quick actions if needed */}
      {/* <CardFooter className="p-4 pt-0">
        <p className="text-xs text-green-600">15% off on first order</p>
      </CardFooter> */}
    </Card>
  );
};
export default RestaurantListItem;