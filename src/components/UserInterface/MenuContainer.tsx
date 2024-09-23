import React, { useState, useEffect } from 'react';
import MenuCard from './MenuCard';
import { MenuItem, useMenu } from './MenuProvider';

interface MenuContainerProps {
    selectedCategory: string;
}

const MenuContainer: React.FC<MenuContainerProps> = ({ selectedCategory }) => {
    const { getMenuContents } = useMenu();
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            const items = await getMenuContents(selectedCategory);
            setMenuItems(items);
        };
        fetchMenuItems();
    }, [selectedCategory, getMenuContents]);

    return (
        <div className="rounded-tr-full rounded-br-full bg-orange-50">
            <div className="rounded-tl-full rounded-bl-full bg-green-50 grid h-full grid-cols-2 gap-4 max-w-5xl mx-auto p-4">
                {menuItems.map((item) => (
                    <MenuCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default MenuContainer;