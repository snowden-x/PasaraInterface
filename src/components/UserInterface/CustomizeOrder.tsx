import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from './CartProvider';

interface MenuItem {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    customizations: Record<string, {
        default: string | null;
        options: Array<{ name: string; price_adjustment: number }>;
    }>;
    is_available: boolean;
}

interface CustomizeOrderProps {
    item: MenuItem;
    onClose: () => void;
}

const CustomizeOrder: React.FC<CustomizeOrderProps> = ({ item, onClose }) => {
    const { addToCart } = useCart();
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string | string[]>>({});
    const [specialInstructions, setSpecialInstructions] = useState<string>('');

    const handleOptionChange = (category: string, value: string) => {
        setSelectedOptions(prev => ({ ...prev, [category]: value }));
    };

    const handleMultiOptionChange = (category: string, value: string) => {
        setSelectedOptions(prev => {
            const currentValues = (prev[category] as string[]) || [];
            return {
                ...prev,
                [category]: currentValues.includes(value)
                    ? currentValues.filter(v => v !== value)
                    : [...currentValues, value]
            };
        });
    };

    const handleAddToCart = () => {
        const customizations = Object.entries(item.customizations).flatMap(([category, customization]) => {
            const selectedValue = selectedOptions[category];
            if (Array.isArray(selectedValue)) {
                return selectedValue.map(option => ({
                    category,
                    option_id: option,
                }));
            } else if (selectedValue) {
                return [{
                    category,
                    option_id: selectedValue,
                }];
            }
            return [];
        });

        if (specialInstructions) {
            customizations.push({
                category: 'Special Instructions',
                option_id: specialInstructions,
            });
        }

        addToCart(item.id, 1, customizations);
        onClose();
    };

    return (
        <div className="space-y-4 mt-4">
            <div>
                <Button onClick={handleAddToCart} className="w-full">
                    Add to Cart
                </Button>
            </div>
            {Object.entries(item.customizations).map(([category, customization]) => (
                <div key={category}>
                    <Label>{category}</Label>
                    {customization.options.length > 1 ? (
                        <RadioGroup
                            value={selectedOptions[category] as string || customization.default || ''}
                            onValueChange={(value) => handleOptionChange(category, value)}
                        >
                            {customization.options.map((option) => (
                                <div key={option.name} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option.name} id={`${category}-${option.name}`} />
                                    <Label htmlFor={`${category}-${option.name}`}>
                                        {option.name}
                                        {option.price_adjustment > 0 && ` (+$${option.price_adjustment.toFixed(2)})`}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    ) : (
                        customization.options.map((option) => (
                            <div key={option.name} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`${category}-${option.name}`}
                                    checked={(selectedOptions[category] as string[])?.includes(option.name)}
                                    onCheckedChange={() => handleMultiOptionChange(category, option.name)}
                                />
                                <Label htmlFor={`${category}-${option.name}`}>
                                    {option.name}
                                    {option.price_adjustment > 0 && ` (+$${option.price_adjustment.toFixed(2)})`}
                                </Label>
                            </div>
                        ))
                    )}
                </div>
            ))}
            <div>
                <Label htmlFor="specialInstructions">Special Instructions</Label>
                <Textarea
                    id="specialInstructions"
                    value={specialInstructions}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSpecialInstructions(e.target.value)}
                    placeholder="Any special requests?"
                />
            </div>
        </div>
    );
};

export default CustomizeOrder;