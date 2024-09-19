import React, { useState } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface Category {
    id: string;
    name: string;
}

const categories: Category[] = [
    { id: 'drinks', name: 'Drinks' },
    { id: 'beverages', name: 'Beverages' },
    { id: 'food', name: 'Food' },
    { id: 'sides', name: 'Sides' },
    { id: 'beer', name: 'Beer' },
    { id: 'wine', name: 'Wine' },
    { id: 'spirits', name: 'Spirits' },
    { id: 'non-alcoholic', name: 'Non-Alcoholic' },
];

const NavMenu: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('drinks');

    return (
        <ScrollArea className="w-full p-4 my-4 sticky z-20 bg-white">
            <nav>
                <div className="flex space-x-4 min-w-max">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className={`px-2 ${activeCategory === category.id ? 'text-primary' : 'text-gray-400'}`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            <span
                                className={`whitespace-nowrap ${
                                    activeCategory === category.id
                                        ? 'text-xl font-semibold'
                                        : 'text-sm font-normal'
                                }`}
                                style={{
                                    display: 'inline-block',
                                    transform: `scale(${activeCategory === category.id ? 1.1 : 1})`,
                                }}
                            >
                                {category.name}
                            </span>
                        </div>
                    ))}
                </div>
            </nav>
            <ScrollBar orientation="horizontal" className="hidden"/>
        </ScrollArea>
    );
};

export default NavMenu;