import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

export interface CartItem {
    id: number;
    product_name: string;
    quantity: number;
    base_price: number;
    total_price: number;
    customizations: {
        category: string;
        option: string;
        price_adjustment: number;
    }[];
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (productId: number, quantity: number, customizations: any[], userId?: number) => Promise<void>;
    updateCartItem: (cartItemId: number, quantity: number) => Promise<void>;
    removeFromCart: (cartItemId: number) => Promise<void>;
    getCart: () => Promise<void>;
    clearCart: () => Promise<void>;
    checkout: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = async (productId: number, quantity: number, customizations: any[], userId?: number) => {
        try {
            const response = await axios.post('http://192.168.56.1:8000/backend1/editables/', {
                action: 'add_to_cart',
                content: {
                    product_id: productId,
                    quantity,
                    customizations,
                    user_id: userId,
                },
            });
            if (response.data && response.data.id) {
                setCart(prevCart => [...prevCart, response.data]);
            } else {
                console.error('Invalid response from server when adding to cart:', response.data);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const updateCartItem = async (cartItemId: number, quantity: number) => {
        try {
            const response = await axios.post('http://192.168.56.1:8000/backend1/editables/', {
                action: 'update_cart_item',
                content: {
                    cart_item_id: cartItemId,
                    quantity,
                },
            });
            setCart(prevCart => prevCart.map(item => item.id === cartItemId ? response.data : item));
        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    };

    const removeFromCart = async (cartItemId: number) => {
        try {
            await axios.post('http://192.168.56.1:8000/backend1/editables/', {
                action: 'remove_from_cart',
                content: {
                    cart_item_id: cartItemId,
                },
            });
            setCart(prevCart => prevCart.filter(item => item.id !== cartItemId));
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const getCart = async () => {
        try {
            const response = await axios.post('http://192.168.56.1:8000/backend1/editables/', {
                action: 'get_cart',
            });
            setCart(response.data);
        } catch (error) {
            console.error('Error getting cart:', error);
        }
    };

    const clearCart = async () => {
        try {
            await axios.post('http://192.168.56.1:8000/backend1/editables/', {
                action: 'clear_cart',
            });
            setCart([]);
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const checkout = async () => {
        try {
            await axios.post('http://192.168.56.1:8000/backend1/editables/', {
                action: 'checkout',
            });
            setCart([]);
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    useEffect(() => {
        getCart();
    }, []);

    return (
        <CartContext.Provider value={{ cart, addToCart, updateCartItem, removeFromCart, getCart, clearCart, checkout }}>
            {children}
        </CartContext.Provider>
    );
};