'use client';

import { useState } from 'react';
import { Product } from '@/lib/data';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Heart, Share2 } from 'lucide-react';

interface ProductDetailsProps {
  product: Product;
  lang: string;
  t: Record<string, string>;
}

export default function ProductDetails({ product, lang, t }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const productName = lang === 'ar' ? product.nameAr : product.name;
  const categoryName = lang === 'ar' ? product.categoryAr : product.category;
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: productName,
      price: product.salePrice || product.price,
      image: product.image,
      quantity
    });
    
    toast({
      title: lang === 'en' ? 'Added to cart' : 'تمت الإضافة إلى السلة',
      description: lang === 'en' 
        ? `${productName} has been added to your cart.` 
        : `تمت إضافة ${productName} إلى سلة التسوق الخاصة بك.`
    });
  };
  
  const handleAddToWishlist = () => {
    toast({
      title: lang === 'en' ? 'Added to wishlist' : 'تمت الإضافة إلى المفضلة',
      description: lang === 'en' 
        ? `${productName} has been added to your wishlist.` 
        : `تمت إضافة ${productName} إلى قائمة المفضلة الخاصة بك.`
    });
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{productName}</h1>
      <p className="text-muted-foreground mb-4">{categoryName}</p>
      
      <div className="flex items-center mb-6">
        {product.sale ? (
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="text-2xl font-bold">${product.salePrice?.toFixed(2)}</span>
            <span className="text-lg text-muted-foreground line-through">${product.price.toFixed(2)}</span>
          </div>
        ) : (
          <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
        )}
      </div>
      
      <div className="mb-6">
        <p className="mb-2 font-medium">
          {t.in_stock}: <span className="text-green-600">{product.stock} {lang === 'en' ? 'units' : 'وحدة'}</span>
        </p>
      </div>
      
      <div className="flex items-center space-x-4 rtl:space-x-reverse mb-8">
        <div className="flex items-center">
          <Button 
            type="button" 
            size="icon"
            variant="outline"
            onClick={decreaseQuantity}
          >
            -
          </Button>
          <Input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={handleQuantityChange}
            className="w-16 text-center mx-2"
          />
          <Button 
            type="button"
            size="icon"
            variant="outline"
            onClick={increaseQuantity}
          >
            +
          </Button>
        </div>
        
        <Button className="flex-1" onClick={handleAddToCart}>
          {t.add_to_cart}
        </Button>
        
        <Button variant="outline" size="icon" onClick={handleAddToWishlist}>
          <Heart className="h-5 w-5" />
        </Button>
        
        <Button variant="outline" size="icon">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="space-y-4">
        <p>
          <strong>{lang === 'en' ? 'SKU:' : 'رقم المنتج:'}</strong> {product.id}
        </p>
        <p>
          <strong>{lang === 'en' ? 'Category:' : 'الفئة:'}</strong> {categoryName}
        </p>
        <p>
          <strong>{lang === 'en' ? 'Tags:' : 'الوسوم:'}</strong> {categoryName}, {lang === 'en' ? 'Pet Supplies' : 'مستلزمات الحيوانات الأليفة'}
        </p>
      </div>
    </div>
  );
}