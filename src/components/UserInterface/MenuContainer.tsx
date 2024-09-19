import React from 'react';
import MenuCard from './MenuCard';
import { useMenu } from './MenuProvider';

const MenuContainer: React.FC = () => {
    const { menuItems } = useMenu();

    return (
        <div className="rounded-tr-full rounded-br-full bg-orange-50">
            <div className="rounded-tl-full rounded-bl-full bg-green-50 grid h-full grid-cols-2 gap-4 max-w-5xl mx-auto p-4">
                {menuItems.map((item, index) => (
                    <MenuCard key={index} item={item} />
                ))}
            </div>
        </div>
    );
};

export default MenuContainer;