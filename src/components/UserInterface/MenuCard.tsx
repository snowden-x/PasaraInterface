import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Add01Icon, Settings01Icon } from 'hugeicons-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import CustomizeOrder from './CustomizeOrder';
import { useMenu } from './MenuProvider';
import { MenuItemOption } from './MenuProvider';

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

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const { name, description, image, price } = item;
  const { addToCart } = useMenu();
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const handleAddToCart = () => {
    addToCart(item);
  };

  const handleSheetOpenChange = (open: boolean) => {
    setIsSheetOpen(open);
  };

  return (
    <div className="group border rounded-xl shadow-lg overflow-hidden bg-white flex flex-col h-full">
      <div className="relative w-full aspect-video overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-bl-2xl"
        />
      </div>
      <div className="p-3 bg-white flex-grow flex flex-col">
        <h4 className="font-medium text-gray-900 mb-2 text-sm w-full">
          <span className="capitalize hover:text-gray-600 text-center block w-full overflow-hidden whitespace-nowrap text-ellipsis leading-normal tracking-tight">
            {name}
          </span>
        </h4>
        {description && (
          <p className="text-xs text-gray-600 text-ellipsis whitespace-nowrap overflow-hidden leading-relaxed tracking-wide">
            {description}
          </p>
        )}
        <div className="mt-auto">
          <span className="text-xs my-2 text-gray-500 text-center">Starting @ <span className="text-primary/90"> GHS {price}</span></span>
        </div>
      </div>
      <div className="px-1 py-1 bg-gray-50 flex justify-between items-center border-t">
        <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
          <SheetTrigger asChild>
            <Button  variant="ghost" className="border-none focus:outline-none rounded-full p-3 m-1">
              <Settings01Icon className="w-4 h-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="top">
            <SheetHeader>
              <SheetTitle>Customize Order</SheetTitle>
            </SheetHeader>
            <CustomizeOrder item={item} onClose={() => setIsSheetOpen(false)} />
          </SheetContent>
        </Sheet>
        <Button variant="ghost" className="border-none rounded-full p-3 m-1 focus:outline-none" onClick={handleAddToCart}>
          <Add01Icon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default MenuCard;