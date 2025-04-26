'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'ar' }
  ];
}
export default function CartPage() {
  const { t, lang, dir } = useLanguage();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    subtotal 
  } = useCart();
  
  const isRtl = dir === 'rtl';
  const shippingCost = 10;
  const total = subtotal + shippingCost;
  
  if (cartItems.length === 0) {
    return (
      <div className="container py-12 flex flex-col items-center justify-center text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">
          {lang === 'en' ? 'Your cart is empty' : 'سلة التسوق فارغة'}
        </h1>
        <p className="text-muted-foreground mb-6">
          {lang === 'en' 
            ? 'Looks like you haven\'t added anything to your cart yet.' 
            : 'يبدو أنك لم تضف أي شيء إلى سلة التسوق الخاصة بك حتى الآن.'
          }
        </p>
        <Button asChild>
          <Link href={`/${lang}/shop`}>
            {lang === 'en' ? 'Continue Shopping' : 'مواصلة التسوق'}
          </Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">{t.cart}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b last:border-0">
                  <div className="flex-shrink-0 w-24 h-24 relative rounded overflow-hidden mb-4 sm:mb-0">
                    <Image 
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow sm:ml-4 sm:rtl:mr-4">
                    <Link href={`/${lang}/product/${item.id}`}>
                      <h3 className="font-semibold text-lg mb-1">
                        {item.name}
                      </h3>
                    </Link>
                    
                    {item.variant && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.variant}
                      </p>
                    )}
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2">
                      <div className="flex items-center mb-4 sm:mb-0">
                        <Button 
                          type="button" 
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (!isNaN(value) && value > 0) {
                              updateQuantity(item.id, value);
                            }
                          }}
                          className="w-12 h-8 text-center mx-2"
                        />
                        <Button 
                          type="button"
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 text-destructive ml-4 rtl:mr-4"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">{t.order_summary}</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {t.subtotal}
                  </span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {t.shipping}
                  </span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-bold">
                  <span>{t.total}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button asChild className="w-full">
                <Link href={`/${lang}/checkout`}>
                  {t.checkout}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}