import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"; // For long item lists

interface OrderSummaryItem {
  id: string | number;
  name: string;
  quantity: number;
  price: number; // Price per item
  imageUrl?: string; // Optional image for display
}

interface OrderSummaryCardProps {
  items: OrderSummaryItem[];
  subtotal: number;
  deliveryFee?: number;
  taxes?: number;
  total: number;
  actionButtonText?: string;
  onActionButtonClick?: () => void;
  isActionButtonDisabled?: boolean;
  isReadOnly?: boolean; // If true, hide action button and potentially item list details
  maxItemDisplayHeight?: string; // e.g., 'h-48' for scrollable item list
}

const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  items,
  subtotal,
  deliveryFee = 0,
  taxes = 0,
  total,
  actionButtonText,
  onActionButtonClick,
  isActionButtonDisabled = false,
  isReadOnly = false,
  maxItemDisplayHeight = 'h-48',
}) => {
  console.log("Rendering OrderSummaryCard with items:", items.length);
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {!isReadOnly && items.length > 0 && (
          <>
            <ScrollArea className={`${maxItemDisplayHeight} pr-3`}>
              <div className="space-y-3 text-sm">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      {item.imageUrl && (
                        <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-cover rounded-sm mr-2"
                             onError={(e) => (e.currentTarget.style.display = 'none')} />
                      )}
                      <div>
                        <p className="font-medium line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Separator />
          </>
        )}

        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {deliveryFee > 0 && (
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
          )}
          {taxes > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>Taxes</span>
              <span>${taxes.toFixed(2)}</span>
            </div>
          )}
        </div>
        <Separator />
        <div className="flex justify-between font-semibold text-base">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </CardContent>
      {!isReadOnly && actionButtonText && onActionButtonClick && (
        <CardFooter>
          <Button className="w-full" onClick={onActionButtonClick} disabled={isActionButtonDisabled}>
            {actionButtonText}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
export default OrderSummaryCard;