import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import NavigationMenu from '@/components/NavigationMenu';
import OrderSummaryCard from '@/components/OrderSummaryCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';

const checkoutFormSchema = z.object({
  // Delivery Address
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  addressLine1: z.string().min(5, { message: "Address is too short." }),
  addressLine2: z.string().optional(),
  city: z.string().min(2, { message: "City is required." }),
  state: z.string().min(2, { message: "State is required." }),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, { message: "Invalid zip code format." }),
  phoneNumber: z.string().regex(/^\d{10,15}$/, { message: "Invalid phone number." }),
  // Payment Method
  paymentMethod: z.enum(['credit_card', 'paypal', 'cod'], { required_error: "Please select a payment method." }),
  // Credit Card Details (conditional)
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
}).refine(data => {
    if (data.paymentMethod === 'credit_card') {
        return !!data.cardNumber && data.cardNumber.length === 16 &&
               !!data.cardExpiry && /^(0[1-9]|1[0-2])\/\d{2}$/.test(data.cardExpiry) &&
               !!data.cardCvc && data.cardCvc.length === 3;
    }
    return true;
}, {
    message: "Please provide valid credit card details.",
    path: ['cardNumber'], // Path to show error for one of the card fields
});


type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

// Mock order summary data for readonly display
const mockOrderSummaryItems = [
  { id: 'm1', name: 'Margherita Pizza', quantity: 1, price: 14.00, imageUrl: 'https://source.unsplash.com/random/300x200/?food,pizza' },
  { id: 'a2', name: 'Caprese Salad', quantity: 2, price: 10.50, imageUrl: 'https://source.unsplash.com/random/300x200/?food,caprese' },
];
const mockSubtotal = mockOrderSummaryItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
const mockDeliveryFee = 5.00;
const mockTaxes = mockSubtotal * 0.1;
const mockTotal = mockSubtotal + mockDeliveryFee + mockTaxes;


const CheckoutPage = () => {
  const navigate = useNavigate();
  console.log('CheckoutPage loaded');

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: '',
      addressLine1: '',
      city: '',
      state: '',
      zipCode: '',
      phoneNumber: '',
      paymentMethod: undefined,
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    console.log('Checkout form submitted:', data);
    // Process order placement
    alert('Order placed successfully! (Simulation)');
    navigate('/orders'); // Navigate to order history or a confirmation page
  };

  const paymentMethod = form.watch('paymentMethod');

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu cartItemCount={0} /> {/* Typically cart count would be from context/state */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Checkout</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ScrollArea className="lg:col-span-2 h-[calc(100vh-200px)] pr-4">
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Address</CardTitle>
                    <CardDescription>Enter your shipping details.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="addressLine1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address Line 1</FormLabel>
                          <FormControl><Input placeholder="123 Main St" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="addressLine2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address Line 2 (Optional)</FormLabel>
                          <FormControl><Input placeholder="Apartment, suite, etc." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl><Input placeholder="Anytown" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State / Province</FormLabel>
                           <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="CA">California</SelectItem>
                                <SelectItem value="NY">New York</SelectItem>
                                <SelectItem value="TX">Texas</SelectItem>
                                {/* Add more states */}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zip / Postal Code</FormLabel>
                          <FormControl><Input placeholder="12345" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    </div>
                     <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl><Input type="tel" placeholder="555-123-4567" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>Choose how you'd like to pay.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-2"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="credit_card" /></FormControl>
                                <FormLabel className="font-normal">Credit Card</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="paypal" /></FormControl>
                                <FormLabel className="font-normal">PayPal</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="cod" /></FormControl>
                                <FormLabel className="font-normal">Cash on Delivery</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {paymentMethod === 'credit_card' && (
                        <div className="space-y-4 mt-4 p-4 border rounded-md">
                            <h4 className="font-medium">Credit Card Details</h4>
                            <FormField control={form.control} name="cardNumber" render={({ field }) => (
                                <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField control={form.control} name="cardExpiry" render={({ field }) => (
                                    <FormItem><FormLabel>Expiry Date</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="cardCvc" render={({ field }) => (
                                    <FormItem><FormLabel>CVC</FormLabel><FormControl><Input placeholder="123" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                            </div>
                        </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>

            <aside className="lg:col-span-1 space-y-6">
              <OrderSummaryCard
                items={mockOrderSummaryItems}
                subtotal={mockSubtotal}
                deliveryFee={mockDeliveryFee}
                taxes={mockTaxes}
                total={mockTotal}
                isReadOnly={true} // Summary is not interactive here
                maxItemDisplayHeight="h-40" // Adjust as needed
              />
              <Button type="submit" className="w-full text-lg" size="lg" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Placing Order...' : 'Place Order'}
              </Button>
            </aside>
          </form>
        </Form>
      </main>
    </div>
  );
};

export default CheckoutPage;