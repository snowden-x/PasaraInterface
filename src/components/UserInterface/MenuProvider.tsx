import React, { useEffect, createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

export interface MenuItemOption {
    [key: string]: string | string[];
}

export interface MenuItem {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    customizations: Record<string, any>;
    is_available: boolean;
}

interface CartItem extends MenuItem {
    options: Record<string, string | string[]>;
    quantity: number;
}

interface MenuContextType {
    menuItems: MenuItem[];
    categories: string[];
    cart: CartItem[];
    addToCart: (item: MenuItem, customizations?: MenuItemOption | null) => void;
    updateCartItem: (index: number, newQuantity: number) => void;
    removeCartItem: (index: number) => void;
    getMenuContents: (selectedCategory: string) => Promise<MenuItem[]>;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

interface MenuProviderProps {
    children: ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        fetchCategories();
        fetchAllMenuItems();
    }, []);

    const fetchCategories = async () => {
        try {
            const result = await axios.post('http://192.168.56.1:8000/backend1/editables/', {
                action: 'get_category',
            });
            setCategories(result.data.map((cat: any) => cat.name));
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchAllMenuItems = async () => {
        try {
            const result = await axios.post('http://192.168.56.1:8000/backend1/editables/', {
                action: 'get_all_menu_contents',
            });
            setMenuItems(result.data);
        } catch (error) {
            console.error('Error fetching all menu items:', error);
        }
    };

    const addToCart = (item: MenuItem, customizations: Record<string, string | string[]>) => {
        const cartItem: CartItem = {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            customizations: customizations,
            options: customizations,
            description: '',
            image: '',
            category: '',
            is_available: false
        };
        setCart(prevCart => [...prevCart, cartItem]);
    };

    const updateCartItem = (index: number, newQuantity: number) => {
        setCart(prevCart => prevCart.map((item, i) =>
            i === index ? { ...item, quantity: newQuantity } : item
        ));
    };

    const removeCartItem = (index: number) => {
        setCart(prevCart => prevCart.filter((_, i) => i !== index));
    };

    const getMenuContents = async (selectedCategory: string) => {
        try {
            const result = await axios.post('http://192.168.56.1:8000/backend1/editables/', {
                action: 'get_menu_contents',
                content: {
                    selectedCategory,
                },
            });
            return result.data;
        } catch (error) {
            console.error('Error fetching menu contents:', error);
            return [];
        }
    };

    return (
        <MenuContext.Provider value={{
            menuItems,
            categories,
            cart,
            addToCart: (item: MenuItem, customizations?: MenuItemOption | null) => {
                const cartItem: CartItem = {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: 1,
                    customizations: customizations || {},
                    options: customizations || {},
                    description: '',
                    image: '',
                    category: '',
                    is_available: false
                };
                setCart(prevCart => [...prevCart, cartItem]);
            },
            updateCartItem,
            removeCartItem,
            getMenuContents
        }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = (): MenuContextType => {
    const context = useContext(MenuContext);
    if (context === undefined) {
        throw new Error('useMenu must be used within a MenuProvider');
    }
    return context;
};