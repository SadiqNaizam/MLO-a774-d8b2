import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/NavigationMenu';
import FoodItemCard from '@/components/FoodItemCard'; // Assuming FoodItemCard can be adapted or a simpler version used
import OrderSummaryCard from '@/components/OrderSummaryCard'; // Custom component for summary
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card'; // For structure if needed
import { Trash2, MinusCircle, PlusCircle } from 'lucide-react';

// Mock cart items
const initialCartItems = [
  { id: 'm1', name: 'Margherita Pizza', description: 'Classic pizza.', price: 14.00, imageUrl: 'https://source.unsplash.com/random/300x200/?food,pizza', quantity: 1 },
  { id: 'a2', name: 'Caprese Salad', description: 'Fresh mozzarella, tomatoes.', price: 10.50, imageUrl: 'https://source.unsplash.com/random/300x200/?food,caprese', quantity: 2 },
];

// Define the type for cart items used in OrderSummaryCard
type CartSummaryItem = {
  id: string | number;
  name: string;
  quantity: number;
  price: number; // Price per item
  imageUrl?: string;
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartSummaryItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const navigate = useNavigate();
  console.log('CartPage loaded');

  const handleQuantityChange = (itemId: string | number, change: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      ).filter(item => item.quantity > 0) // Filter out if quantity becomes 0, or handle remove separately
    );
  };

  const handleRemoveItem = (itemId: string | number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    console.log('Removed item from cart:', itemId);
  };
  
  const handleApplyPromo = () => {
    console.log('Applied promo code:', promoCode);
    // Add promo code logic
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 5.00 : 0; // Example delivery fee
  const taxes = subtotal * 0.1; // Example tax rate
  const total = subtotal + deliveryFee + taxes;

  const orderSummaryItems: CartSummaryItem[] = cartItems.map(item => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    imageUrl: item.imageUrl
  }));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Your Cart</h1>
        {cartItems.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent>
              <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
              <Button onClick={() => navigate('/')}>Continue Shopping</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <section className="lg:col-span-2 space-y-4" aria-labelledby="cart-items-heading">
              <h2 id="cart-items-heading" className="sr-only">Items in your cart</h2>
              <ScrollArea className="h-[calc(100vh-300px)] lg:h-auto lg:max-h-[600px] pr-2">
                <div className="space-y-4">
                {cartItems.map(item => (
                  <Card key={item.id} className="flex flex-col sm:flex-row items-center p-4 gap-4 shadow">
                     {item.imageUrl && (
                        <img src={item.imageUrl} alt={item.name} className="w-24 h-24 sm:w-20 sm:h-20 object-cover rounded-md flex-shrink-0"/>
                      )}
                    <div className="flex-grow text-center sm:text-left">
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                      <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.id, -1)} aria-label="Decrease quantity">
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.id, 1)} aria-label="Increase quantity">
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="font-semibold text-lg sm:ml-4 mt-2 sm:mt-0">${(item.price * item.quantity).toFixed(2)}</p>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700" aria-label="Remove item">
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </Card>
                ))}
                </div>
              </ScrollArea>
            </section>

            <aside className="lg:col-span-1 space-y-6" aria-labelledby="order-summary-heading">
              <h2 id="order-summary-heading" className="sr-only">Order Summary</h2>
              <Card>
                <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold">Promo Code</h3>
                    <div className="flex gap-2">
                        <Input
                        type="text"
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <Button onClick={handleApplyPromo} disabled={!promoCode}>Apply</Button>
                    </div>
                </CardContent>
              </Card>
              <OrderSummaryCard
                items={orderSummaryItems}
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                taxes={taxes}
                total={total}
                actionButtonText="Proceed to Checkout"
                onActionButtonClick={() => navigate('/checkout')}
                isActionButtonDisabled={cartItems.length === 0}
                maxItemDisplayHeight="h-32" // Shorter list in summary
              />
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;