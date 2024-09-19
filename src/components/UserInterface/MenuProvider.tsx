import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface MenuItemOption {
    size: string;
    protein: string;
    sides: string[];
    addons: string[];
}

interface MenuItem {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    defaultOptions: MenuItemOption;
    availableOptions: {
        sizes: string[];
        proteins: string[];
        sides: string[];
        addons: string[];
    };
}

interface CartItem extends MenuItem {
    options: MenuItemOption;
    quantity: number;
}

interface MenuContextType {
    menuItems: MenuItem[];
    cart: CartItem[];
    addToCart: (item: MenuItem, customizations?: MenuItemOption | null) => void;
    updateCartItem: (index: number, newQuantity: number) => void;
    removeCartItem: (index: number) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

interface MenuProviderProps {
    children: ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
    const [menuItems,] = useState<MenuItem[]>([
        {
            id: 1,
            name: "Poached Eggs",
            description: "Leaves, Taprika",
            image: "/eggs.jpg",
            price: 8.99,
            category: "Fast Food",
            defaultOptions: {
                size: "Medium",
                protein: "Chicken",
                sides: ["Fries"],
                addons: []
            },
            availableOptions: {
                sizes: ["Small", "Medium", "Large"],
                proteins: ["Chicken", "Beef", "Fish", "Tofu"],
                sides: ["Fries", "Salad", "Coleslaw", "Rice"],
                addons: ["Cheese", "Bacon", "Avocado", "Extra sauce"]
            }
        },
        {
            id: 2,
            name: "Burger",
            description: "Beef patty, Lettuce, Tomato, Cheese",
            image: "/pancake.jpg",
            price: 10.99,
            category: "Fast Food",
            defaultOptions: {
                size: "Medium",
                protein: "Beef",
                sides: ["Fries"],
                addons: []
            },
            availableOptions: {
                sizes: ["Small", "Medium", "Large"],
                proteins: ["Beef", "Chicken", "Fish", "Tofu"],
                sides: ["Fries", "Salad", "Coleslaw", "Rice"],
                addons: ["Cheese", "Bacon", "Avocado", "Extra sauce"]
            }
        },
        {
            id: 3,
            name: "Pizza",
            description: "Cheese, Tomato, Mushroom",
            image: "/tomato.jpg",
            price: 12.99,
            category: "Fast Food",
            defaultOptions: {
                size: "Medium",
                protein: "Cheese",
                sides: ["Fries"],
                addons: []
            },
            availableOptions: {
                sizes: ["Small", "Medium", "Large"],
                proteins: ["Cheese", "Tomato", "Mushroom"],
                sides: ["Fries", "Salad", "Coleslaw", "Rice"],
                addons: ["Cheese", "Bacon", "Avocado", "Extra sauce"]
            }
        },
        {
            id: 4,
            name: "Pasta",
            description: "Pasta, Tomato, Cheese",
            image: "/steakey.jpg",
            price: 11.99,
            category: "Fast Food",
            defaultOptions: {
                size: "Medium",
                protein: "Pasta",
                sides: ["Fries"],
                addons: []
            },
            availableOptions: {
                sizes: ["Small", "Medium", "Large"],
                proteins: ["Pasta", "Tomato", "Cheese"],
                sides: ["Fries", "Salad", "Coleslaw", "Rice"],
                addons: ["Cheese", "Bacon", "Avocado", "Extra sauce"]
            }
        },
                

            // ... other menu items
    ]);

    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: MenuItem, customizations: MenuItemOption | null = null) => {
        const cartItem: CartItem = {
            ...item,
            options: customizations || item.defaultOptions,
            quantity: 1
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

    return (
        <MenuContext.Provider value={{ menuItems, cart, addToCart, updateCartItem, removeCartItem }}>
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