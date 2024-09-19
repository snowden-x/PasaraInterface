import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag01Icon } from 'hugeicons-react';
import { Badge } from "@/components/ui/badge";
import { useMenu } from './MenuProvider';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface CartItem {
    name: string;
    price: number;
    quantity: number;
    options: {
        size: string;
        protein: string;
        sides: string[];
        addons: string[];
        specialInstructions?: string;
    };
}

const Cart: React.FC = () => {
    const { cart, updateCartItem, removeCartItem } = useMenu();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <span>
                        <ShoppingBag01Icon className="h-4 w-4" />
                    </span>
                    {totalItems > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-2" variant="destructive">
                            {totalItems}
                        </Badge>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col h-[calc(100vh-10rem)]">
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <>
                            <ScrollArea className="flex-grow pr-4">
                                {cart.map((item: CartItem, index: number) => (
                                    <div key={index} className="flex justify-between items-start mb-6 pb-4 border-b">
                                        <div className="flex-grow pr-4">
                                            <h3 className="font-semibold">{item.name}</h3>
                                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                            <p className="text-sm text-gray-500">Size: {item.options.size}</p>
                                            <p className="text-sm text-gray-500">Protein: {item.options.protein}</p>
                                            <p className="text-sm text-gray-500">Sides: {item.options.sides.join(', ')}</p>
                                            <p className="text-sm text-gray-500">Add-ons: {item.options.addons.join(', ')}</p>
                                            {item.options.specialInstructions && (
                                                <p className="text-sm text-gray-500">Special Instructions: {item.options.specialInstructions}</p>
                                            )}
                                        </div>
                                        <div className="text-right flex flex-col items-end">
                                            <p className="font-semibold mb-2">${(item.price * item.quantity).toFixed(2)}</p>
                                            <div className="flex items-center space-x-2 mb-2">
                                                <Button variant="outline" size="sm" onClick={() => updateCartItem(index, Math.max(1, item.quantity - 1))}>-</Button>
                                                <span>{item.quantity}</span>
                                                <Button variant="outline" size="sm" onClick={() => updateCartItem(index, item.quantity + 1)}>+</Button>
                                            </div>
                                            <Button variant="destructive" size="sm" onClick={() => removeCartItem(index)}>Remove</Button>
                                        </div>
                                    </div>
                                ))}
                                <ScrollBar orientation="vertical" className="hidden" />
                            </ScrollArea>
                            <div className="mt-6 pt-4 border-t">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-semibold">Total</h3>
                                    <p className="font-semibold">${totalPrice}</p>
                                </div>
                                <Button className="w-full">Checkout</Button>
                            </div>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default Cart;