import React, { useState } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useMenu } from './MenuProvider';
import MenuContainer from './MenuContainer';

const NavMenu: React.FC = () => {
    const { categories } = useMenu();
    const [activeCategory, setActiveCategory] = useState<string>(categories[0] || 'Food');

    return (
        <>
            <ScrollArea className="w-full p-4 my-4 sticky z-20 bg-white">
                <nav>
                    <div className="flex space-x-4 min-w-max">
                        {categories.map((category) => (
                            <div
                                key={category}
                                className={`px-2 ${activeCategory === category ? 'text-primary' : 'text-gray-400'}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                <span
                                    className={`whitespace-nowrap ${
                                        activeCategory === category
                                            ? 'text-xl font-semibold'
                                            : 'text-sm font-normal'
                                    }`}
                                    style={{
                                        display: 'inline-block',
                                        transform: `scale(${activeCategory === category ? 1.1 : 1})`,
                                    }}
                                >
                                    {category}
                                </span>
                            </div>
                        ))}
                    </div>
                </nav>
                <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>
            <MenuContainer selectedCategory={activeCategory} />
        </>
    );
};

export default NavMenu;