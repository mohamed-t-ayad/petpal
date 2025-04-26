'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { categories } from '@/lib/data';

interface ProductFiltersProps {
  lang: string;
  t: Record<string, string>;
}

export default function ProductFilters({ lang, t }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => 
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };
  
  const handleReset = () => {
    setPriceRange([0, 150]);
    setSelectedCategories([]);
  };
  
  const isRtl = lang === 'ar';
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">{t.filter_by}</h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="mb-4" 
          onClick={handleReset}
        >
          {lang === 'en' ? 'Reset Filters' : 'إعادة تعيين الفلاتر'}
        </Button>
      </div>
      
      <Accordion type="multiple" defaultValue={['categories', 'price']}>
        <AccordionItem value="categories">
          <AccordionTrigger>{t.nav_categories}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Checkbox 
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => handleCategoryChange(category.id)}
                  />
                  <label 
                    htmlFor={category.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {isRtl ? category.nameAr : category.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="price">
          <AccordionTrigger>{t.price_range}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 150]}
                max={150}
                step={10}
                value={priceRange}
                onValueChange={handlePriceChange}
              />
              <div className="flex justify-between items-center">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}