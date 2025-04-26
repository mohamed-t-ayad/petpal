'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/cart-context';
import { Product } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/language-context';

interface ProductGridProps {
  products: Product[];
  lang: string;
  t: Record<string, string>;
}

export default function ProductGrid({ products, lang, t }: ProductGridProps) {
  const { addToCart } = useCart();
  const { dir } = useLanguage();
  const isRtl = dir === 'rtl';

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: lang === 'ar' ? product.nameAr : product.name,
      price: product.salePrice || product.price,
      image: product.image,
      quantity: 1
    });
    
    toast({
      title: lang === 'en' ? 'Added to cart' : 'تمت الإضافة إلى السلة',
      description: lang === 'en' 
        ? `${product.name} has been added to your cart.` 
        : `تمت إضافة ${product.nameAr} إلى سلة التسوق الخاصة بك.`
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="h-full overflow-hidden transition hover:shadow-md">
          <Link href={`/${lang}/product/${product.id}`}>
            <div className="aspect-square relative">
              <Image 
                src={product.image}
                alt={lang === 'ar' ? product.nameAr : product.name}
                fill
                className="object-cover"
              />
              {product.sale && (
                <span className="absolute top-2 right-2 rtl:left-2 rtl:right-auto bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded">
                  {t.sale}
                </span>
              )}
            </div>
          </Link>
          <CardContent className="p-4">
            <Link href={`/${lang}/product/${product.id}`}>
              <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                {lang === 'ar' ? product.nameAr : product.name}
              </h3>
            </Link>
            <p className="text-muted-foreground text-sm mb-2 line-clamp-1">
              {lang === 'ar' ? product.categoryAr : product.category}
            </p>
            <div className="flex items-center justify-between mt-2">
              <div>
                {product.sale ? (
                  <div className="flex flex-col">
                    <span className="font-bold">
                      ${product.salePrice?.toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              <Button size="sm" onClick={() => handleAddToCart(product)}>
                {t.add_to_cart}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}