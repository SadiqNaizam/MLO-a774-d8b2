import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/NavigationMenu';
import OrderProgressIndicator from '@/components/OrderProgressIndicator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Package, RotateCcw, Eye } from 'lucide-react'; // Eye for View Details

// Mock order data
const sampleOrders = [
  { id: 'order123', restaurantName: 'The Gourmet Place', date: '2024-07-28', total: 35.99, status: 'delivered', items: [{ name: 'Lasagna', qty: 1 }, { name: 'Coke', qty: 2 }], progressStatus: 'delivered' },
  { id: 'order456', restaurantName: 'Quick Bites Cafe', date: '2024-07-29', total: 18.50, status: 'Preparing Food', items: [{ name: 'Club Sandwich', qty: 1 }], progressStatus: 'preparing' },
  { id: 'order789', restaurantName: 'Spice Route Grill', date: '2024-07-27', total: 55.20, status: 'Out for Delivery', items: [{ name: 'Butter Chicken', qty: 2 }, { name: 'Naan', qty: 4 }], progressStatus: 'out_for_delivery' },
  { id: 'orderABC', restaurantName: 'The Gourmet Place', date: '2024-07-25', total: 22.00, status: 'Cancelled', items: [{ name: 'Margherita Pizza', qty: 1 }], progressStatus: 'cancelled' },
  { id: 'orderDEF', restaurantName: 'Green Leaf Eatery', date: '2024-07-30', total: 28.75, status: 'Order Confirmed', items: [{ name: 'Vegan Bowl', qty: 1 }, {name: 'Smoothie', qty:1}], progressStatus: 'confirmed' },
];

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  console.log('OrderHistoryPage loaded');

  const activeOrders = sampleOrders.filter(order => ['confirmed', 'preparing', 'out_for_delivery'].includes(order.progressStatus));
  const pastOrders = sampleOrders.filter(order => ['delivered', 'cancelled'].includes(order.progressStatus));

  const handleReorder = (orderId: string) => {
    console.log('Reordering order:', orderId);
    // Navigate to cart with items from this order, or to restaurant page
    alert(`Simulating reorder for order ${orderId}. Items would be added to cart.`);
    navigate('/cart');
  };

  const handleViewDetails = (orderId: string) => {
    console.log('Viewing details for order:', orderId);
    // Navigate to a specific order detail page (not implemented in this request)
    alert(`Simulating view details for order ${orderId}.`);
    // navigate(`/orders/${orderId}`); // If a detailed order page exists
  };

  const renderOrderCard = (order: typeof sampleOrders[0]) => (
    <Card key={order.id} className="mb-4 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{order.restaurantName}</CardTitle>
            <CardDescription>Order ID: {order.id} | Date: {order.date}</CardDescription>
          </div>
          <Badge variant={order.status === 'Delivered' ? 'default' : (order.status === 'Cancelled' ? 'destructive' : 'secondary')}>
            {order.status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-1">Items: {order.items.map(item => `${item.name} (x${item.qty})`).join(', ')}</p>
        <p className="font-semibold">Total: ${order.total.toFixed(2)}</p>
        {['confirmed', 'preparing', 'out_for_delivery'].includes(order.progressStatus) && (
          <div className="mt-3">
            <OrderProgressIndicator currentStatus={order.progressStatus} />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => handleViewDetails(order.id)}>
          <Eye className="mr-2 h-4 w-4" /> View Details
        </Button>
        {order.status === 'delivered' && (
          <Button variant="default" size="sm" onClick={() => handleReorder(order.id)}>
            <RotateCcw className="mr-2 h-4 w-4" /> Reorder
          </Button>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">My Orders</h1>
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Active Orders ({activeOrders.length})</TabsTrigger>
            <TabsTrigger value="past">Past Orders ({pastOrders.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <ScrollArea className="h-[calc(100vh-250px)] pt-4 pr-1">
              {activeOrders.length > 0 ? (
                activeOrders.map(renderOrderCard)
              ) : (
                <div className="text-center py-10">
                  <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600">You have no active orders.</p>
                  <Button onClick={() => navigate('/')} className="mt-4">Order Now</Button>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="past">
            <ScrollArea className="h-[calc(100vh-250px)] pt-4 pr-1">
              {pastOrders.length > 0 ? (
                pastOrders.map(renderOrderCard)
              ) : (
                <div className="text-center py-10">
                  <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600">You have no past orders.</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default OrderHistoryPage;