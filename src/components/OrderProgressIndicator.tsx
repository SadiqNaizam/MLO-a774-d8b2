import React from 'react';
import { CheckCircle, Package, CookingPot, Bike, Home } from 'lucide-react'; // Example icons

interface OrderStep {
  id: string;
  label: string;
  icon: React.ElementType;
  completed: boolean;
  active: boolean;
}

interface OrderProgressIndicatorProps {
  currentStatus: string; // e.g., "confirmed", "preparing", "out_for_delivery", "delivered"
  // Or provide a more structured status:
  // activeStepId: string;
  // steps: Array<{ id: string; label: string; icon: React.ElementType; }>;
}

const OrderProgressIndicator: React.FC<OrderProgressIndicatorProps> = ({ currentStatus }) => {
  console.log("Rendering OrderProgressIndicator with status:", currentStatus);

  const definedSteps: Omit<OrderStep, 'completed' | 'active'>[] = [
    { id: 'confirmed', label: 'Order Confirmed', icon: CheckCircle },
    { id: 'preparing', label: 'Preparing Food', icon: CookingPot },
    { id: 'out_for_delivery', label: 'Out for Delivery', icon: Bike },
    { id: 'delivered', label: 'Delivered', icon: Home },
  ];

  const activeIndex = definedSteps.findIndex(step => step.id === currentStatus);

  const steps: OrderStep[] = definedSteps.map((step, index) => ({
    ...step,
    completed: index < activeIndex,
    active: index === activeIndex,
  }));

  if (steps.length === 0) {
    return <p className="text-sm text-gray-500">Order status not available.</p>;
  }

  return (
    <div className="w-full py-4">
      <div className="flex items-start justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center text-center w-1/4">
              <div
                className={`rounded-full h-10 w-10 flex items-center justify-center border-2
                  ${step.completed ? 'bg-green-500 border-green-500 text-white' : ''}
                  ${step.active ? 'bg-orange-500 border-orange-500 text-white' : ''}
                  ${!step.completed && !step.active ? 'bg-gray-100 border-gray-300 text-gray-400' : ''}
                `}
              >
                <step.icon className="h-5 w-5" />
              </div>
              <p
                className={`mt-2 text-xs font-medium
                  ${step.active ? 'text-orange-600' : 'text-gray-600'}
                  ${step.completed ? 'text-green-600' : ''}
                `}
              >
                {step.label}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mt-5
                ${step.completed ? 'bg-green-500' : 'bg-gray-300'}
              "></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
export default OrderProgressIndicator;