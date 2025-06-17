import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/NavigationMenu';
import FoodItemCard from '@/components/FoodItemCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Clock, ChevronLeft } from 'lucide-react';

// Mock data - in a real app, this would be fetched
const mockRestaurantData = {
  '1': {
    name: 'The Gourmet Place',
    logoUrl: 'https://avatar.vercel.sh/gourmet.png?text=GP',
    rating: 4.7,
    cuisine: 'Italian, Pizza',
    deliveryTime: '30-40 min',
    address: '123 Foodie Lane, Flavor Town',
    menu: {
      appetizers: [
        { id: 'a1', name: 'Bruschetta', description: 'Grilled bread rubbed with garlic and topped with olive oil and salt.', price: 8.99, imageUrl: 'https://source.unsplash.com/random/300x200/?food,bruschetta' },
        { id: 'a2', name: 'Caprese Salad', description: 'Fresh mozzarella, tomatoes, and sweet basil.', price: 10.50, imageUrl: 'https://source.unsplash.com/random/300x200/?food,caprese' },
      ],
      main_courses: [
        { id: 'm1', name: 'Margherita Pizza', description: 'Classic pizza with tomatoes, mozzarella, and basil.', price: 14.00, imageUrl: 'https://source.unsplash.com/random/300x200/?food,pizza' },
        { id: 'm2', name: 'Lasagna Bolognese', description: 'Layers of pasta, meat sauce, and cheese.', price: 16.50, imageUrl: 'https://source.unsplash.com/random/300x200/?food,lasagna' },
      ],
      desserts: [
        { id: 'd1', name: 'Tiramisu', description: 'Coffee-flavoured Italian dessert.', price: 7.00, imageUrl: 'https://source.unsplash.com/random/300x200/?food,tiramisu' },
      ]
    }
  },
  // Add more mock restaurants if needed
};

type MenuItem = { id: string; name: string; description: string; price: number; imageUrl: string };
type MenuCategory = Record<string, MenuItem[]>;
type Restaurant = { name: string; logoUrl: string; rating: number; cuisine: string; deliveryTime: string; address: string; menu: MenuCategory };


const RestaurantDetailPage = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [cartItemsCount, setCartItemsCount] = useState(0); // Example cart state

  useEffect(() => {
    console.log('RestaurantDetailPage loaded for ID:', restaurantId);
    if (restaurantId && mockRestaurantData[restaurantId as keyof typeof mockRestaurantData]) {
      setRestaurant(mockRestaurantData[restaurantId as keyof typeof mockRestaurantData]);
    } else {
      // Handle restaurant not found, e.g., navigate to 404
      console.error('Restaurant not found for ID:', restaurantId);
      // navigate('/not-found'); // Or show a message
    }
  }, [restaurantId, navigate]);

  const handleAddToCart = (itemId: string | number) => {
    console.log('Added to cart:', itemId, 'from restaurant:', restaurant?.name);
    setCartItemsCount(prev => prev + 1);
    // Add actual cart logic here
  };

  const handleCustomizeItem = (itemId: string | number) => {
    console.log('Customize item:', itemId);
    // Open customization modal/sheet
  };

  if (!restaurant) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavigationMenu />
        <main className="flex-grow container mx-auto px-4 py-6 text-center">
          <p className="text-xl text-gray-700">Loading restaurant details or restaurant not found...</p>
           <Button onClick={() => navigate('/')} variant="outline" className="mt-4">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </main>
      </div>
    );
  }

  const menuCategories = Object.keys(restaurant.menu);

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu cartItemCount={cartItemsCount} />
      <main className="flex-grow container mx-auto px-4 py-6 pb-24"> {/* Padding bottom for sticky button */}
        <header className="mb-6 p-4 border-b">
          <Button onClick={() => navigate(-1)} variant="outline" size="sm" className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border">
              <AvatarImage src={restaurant.logoUrl || `https://avatar.vercel.sh/${restaurant.name}.png?text=${restaurant.name.substring(0,2)}`} alt={restaurant.name} />
              <AvatarFallback>{restaurant.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{restaurant.name}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <Badge variant="secondary">{restaurant.cuisine}</Badge>
                <span className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor"/> {restaurant.rating}</span>
                <span className="flex items-center"><Clock className="h-4 w-4 mr-1"/> {restaurant.deliveryTime}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{restaurant.address}</p>
            </div>
          </div>
        </header>

        <Tabs defaultValue={menuCategories[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:w-auto">
            {menuCategories.map(category => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category.replace('_', ' ')}
              </TabsTrigger>
            ))}
          </TabsList>
          {menuCategories.map(category => (
            <TabsContent key={category} value={category}>
              <ScrollArea className="h-[calc(100vh-350px)] pr-3"> {/* Adjust height */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                  {restaurant.menu[category as keyof typeof restaurant.menu].map((item: MenuItem) => (
                    <FoodItemCard
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      imageUrl={item.imageUrl || `https://source.unsplash.com/random/300x200/?food,${encodeURIComponent(item.name)}`}
                      onAddToCart={() => handleAddToCart(item.id)}
                      onCustomize={() => handleCustomizeItem(item.id)}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {cartItemsCount > 0 && (
        <div className="sticky bottom-0 left-0 right-0 bg-white p-4 border-t shadow-lg z-40">
          <Button className="w-full text-lg" size="lg" onClick={() => navigate('/cart')}>
            <ShoppingCart className="mr-2 h-5 w-5" /> View Cart ({cartItemsCount} items)
          </Button>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetailPage;