import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/NavigationMenu';
import Carousel from '@/components/Carousel';
import RestaurantListItem from '@/components/RestaurantListItem';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';

const promoSlides = [
  { id: 'promo1', imageUrl: 'https://source.unsplash.com/random/1200x500/?food,offer,discount', altText: 'Special Offer: 50% Off', content: <div className="text-white text-center p-4 bg-black/50 rounded-lg"><h2 className="text-2xl md:text-4xl font-bold">50% Off Your First Order!</h2><p className="text-sm md:text-lg">Use code: FIRST50</p></div> },
  { id: 'promo2', imageUrl: 'https://source.unsplash.com/random/1200x500/?food,delivery,fast', altText: 'Free Delivery Promotion', content: <div className="text-white text-center p-4 bg-black/50 rounded-lg"><h2 className="text-2xl md:text-4xl font-bold">Free Delivery Over $25</h2><p className="text-sm md:text-lg">Delicious food, delivered free.</p></div> },
  { id: 'promo3', imageUrl: 'https://source.unsplash.com/random/1200x500/?food,cuisine,variety', altText: 'New Cuisines Added', content: <div className="text-white text-center p-4 bg-black/50 rounded-lg"><h2 className="text-2xl md:text-4xl font-bold">Explore New Cuisines</h2><p className="text-sm md:text-lg">Discover flavors from around the world.</p></div> },
];

const sampleRestaurants = [
  { id: '1', name: 'The Gourmet Place', imageUrl: 'https://source.unsplash.com/random/400x225/?restaurant,gourmet', cuisineTypes: ['Italian', 'Pizza', 'Pasta'], rating: 4.7, deliveryTimeEstimate: '30-40 min' },
  { id: '2', name: 'Quick Bites Cafe', imageUrl: 'https://source.unsplash.com/random/400x225/?restaurant,cafe', cuisineTypes: ['Sandwiches', 'Coffee', 'Salads'], rating: 4.3, deliveryTimeEstimate: '20-30 min' },
  { id: '3', name: 'Spice Route Grill', imageUrl: 'https://source.unsplash.com/random/400x225/?restaurant,indian', cuisineTypes: ['Indian', 'Curry', 'Grill'], rating: 4.9, deliveryTimeEstimate: '35-45 min' },
  { id: '4', name: 'Ocean\'s Catch', imageUrl: 'https://source.unsplash.com/random/400x225/?restaurant,seafood', cuisineTypes: ['Seafood', 'Fish & Chips'], rating: 4.5, deliveryTimeEstimate: '40-50 min' },
  { id: '5', name: 'Green Leaf Eatery', imageUrl: 'https://source.unsplash.com/random/400x225/?restaurant,vegan', cuisineTypes: ['Vegan', 'Healthy', 'Bowls'], rating: 4.6, deliveryTimeEstimate: '25-35 min' },
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  console.log('HomePage loaded');

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Implement search logic, e.g., navigate to a search results page or filter current list
  };

  const handleRestaurantClick = (id: string | number) => {
    console.log('Navigating to restaurant:', id);
    navigate(`/restaurants/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu cartItemCount={3} onSearch={handleSearch} />
      <main className="flex-grow container mx-auto px-4 py-6 space-y-8">
        <section aria-labelledby="search-restaurants">
          <h2 id="search-restaurants" className="sr-only">Search Restaurants</h2>
          <div className="relative">
            <Input
              type="search"
              placeholder="Search for restaurants, cuisines, or dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-base h-12 shadow-sm"
              aria-label="Search for restaurants"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
             <Button 
                onClick={() => handleSearch(searchQuery)} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-9"
                size="sm"
              >
                Search
              </Button>
          </div>
        </section>

        <section aria-labelledby="promotions-carousel">
          <h2 id="promotions-carousel" className="sr-only">Promotions</h2>
          <Carousel slides={promoSlides} autoplayDelay={5000} />
        </section>

        <section aria-labelledby="featured-restaurants">
          <h2 id="featured-restaurants" className="text-2xl font-semibold mb-4 text-gray-800">Featured Restaurants</h2>
          <ScrollArea className="h-[calc(100vh-400px)] md:h-auto"> {/* Adjust height as needed */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sampleRestaurants.map(restaurant => (
                <RestaurantListItem
                  key={restaurant.id}
                  id={restaurant.id}
                  name={restaurant.name}
                  imageUrl={restaurant.imageUrl || `https://source.unsplash.com/random/400x225/?restaurant,${encodeURIComponent(restaurant.name)}`}
                  cuisineTypes={restaurant.cuisineTypes}
                  rating={restaurant.rating}
                  deliveryTimeEstimate={restaurant.deliveryTimeEstimate}
                  onClick={handleRestaurantClick}
                />
              ))}
            </div>
          </ScrollArea>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" onClick={() => console.log("Load more restaurants clicked")}>
              Load More Restaurants
            </Button>
          </div>
        </section>
      </main>
      {/* A simple footer could be added here if not part of NavigationMenu component logic */}
       <footer className="text-center p-4 text-gray-600 border-t">
         FoodApp &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default HomePage;