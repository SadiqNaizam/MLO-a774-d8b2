import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlusCircle } from 'lucide-react';

interface FoodItemCardProps {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  onAddToCart: (id: string | number) => void;
  // Optional: for items already in cart to show quantity or different action
  quantityInCart?: number;
  onCustomize?: (id: string | number) => void; // To open customization dialog/sheet
}

const FoodItemCard: React.FC<FoodItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart,
  quantityInCart,
  onCustomize,
}) => {
  console.log("Rendering FoodItemCard:", name);

  const handleActionClick = () => {
    if (onCustomize) {
      console.log("Customize clicked for FoodItemCard:", name, id);
      onCustomize(id);
    } else {
      console.log("Add to cart clicked for FoodItemCard:", name, id);
      onAddToCart(id);
    }
  };

  return (
    <Card className="w-full flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <AspectRatio ratio={4 / 3}>
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-3 space-y-1 flex-grow">
        <CardTitle className="text-md font-semibold line-clamp-1">{name}</CardTitle>
        {description && <p className="text-xs text-gray-500 line-clamp-2">{description}</p>}
      </CardContent>
      <CardFooter className="p-3 pt-1 flex items-center justify-between">
        <span className="text-md font-semibold text-gray-800">${price.toFixed(2)}</span>
        <Button size="sm" onClick={handleActionClick} variant={onCustomize ? "outline" : "default"}>
          <PlusCircle className="mr-1 h-4 w-4" />
          {quantityInCart && quantityInCart > 0 ? `Add More (${quantityInCart})` : (onCustomize ? 'Customize' : 'Add')}
        </Button>
      </CardFooter>
    </Card>
  );
};
export default FoodItemCard;