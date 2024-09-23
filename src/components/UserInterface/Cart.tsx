import React, { useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag01Icon } from 'hugeicons-react';
import { Badge } from "@/components/ui/badge";
import { useCart, CartItem } from './CartProvider';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const Cart: React.FC = () => {
    const { cart, updateCartItem, removeFromCart, clearCart, checkout, getCart } = useCart();

    useEffect(() => {
        getCart();
    }, [getCart]);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.total_price, 0).toFixed(2);

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
                                {cart.map((item) => (
                                    <div key={item.id} className="flex justify-between items-start mb-6 pb-4 border-b">
                                        <div className="flex-grow pr-4">
                                            <h3 className="font-semibold">{item.product_name}</h3>
                                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                            <p className="text-sm text-gray-500">Base Price: ${item.base_price.toFixed(2)}</p>
                                            {item.customizations.map((customization, index) => (
                                                <p key={index} className="text-sm text-gray-500">
                                                    {customization.category}: {customization.option}
                                                    {customization.price_adjustment > 0 && ` (+$${customization.price_adjustment.toFixed(2)})`}
                                                </p>
                                            ))}
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <p className="font-semibold">Total: ${item.total_price.toFixed(2)}</p>
                                            <Button variant="outline" size="sm" onClick={() => removeFromCart(item.id)}>
                                                Remove
                                            </Button>
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
                                <Button className="w-full" onClick={checkout}>Checkout</Button>
                            </div>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default Cart;