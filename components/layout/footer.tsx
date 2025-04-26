'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const { t, lang } = useLanguage();
  
  return (
    <footer className="bg-card text-card-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">{t.site_name}</h3>
            <p className="text-muted-foreground mb-4">
              {t.site_tagline}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">{t.nav_categories}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/category/dogs`} className="text-muted-foreground hover:text-foreground">
                  {t.nav_dogs}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/category/cats`} className="text-muted-foreground hover:text-foreground">
                  {t.nav_cats}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/category/birds`} className="text-muted-foreground hover:text-foreground">
                  {t.nav_birds}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/category/fish`} className="text-muted-foreground hover:text-foreground">
                  {t.nav_fish}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/category/small-pets`} className="text-muted-foreground hover:text-foreground">
                  {t.nav_small_pets}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">{t.account}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/account`} className="text-muted-foreground hover:text-foreground">
                  {t.my_profile}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/account/orders`} className="text-muted-foreground hover:text-foreground">
                  {t.my_orders}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/account/wishlist`} className="text-muted-foreground hover:text-foreground">
                  {t.my_wishlist}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/account/addresses`} className="text-muted-foreground hover:text-foreground">
                  {t.address_book}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">{t.newsletter_signup}</h3>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Input placeholder="Email" className="max-w-xs" />
              <Button>{t.nav_shop === 'Shop' ? 'Subscribe' : 'اشتراك'}</Button>
            </div>
            <p className="text-muted-foreground text-sm mt-4">
              {t.footer_privacy === 'Privacy Policy' ? 
                'Get updates on sales, offers, and new products.' : 
                'احصل على تحديثات حول المبيعات والعروض والمنتجات الجديدة.'}
            </p>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} {t.site_name}. {t.footer_rights === 'All Rights Reserved' ? 'All Rights Reserved.' : 'جميع الحقوق محفوظة.'}
          </p>
          
          <div className="flex flex-wrap justify-center space-x-4 rtl:space-x-reverse">
            <Link href={`/${lang}/about`} className="text-sm text-muted-foreground hover:text-foreground">
              {t.footer_about}
            </Link>
            <Link href={`/${lang}/terms`} className="text-sm text-muted-foreground hover:text-foreground">
              {t.footer_terms}
            </Link>
            <Link href={`/${lang}/privacy`} className="text-sm text-muted-foreground hover:text-foreground">
              {t.footer_privacy}
            </Link>
            <Link href={`/${lang}/shipping`} className="text-sm text-muted-foreground hover:text-foreground">
              {t.footer_shipping}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}