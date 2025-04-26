'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import { useCart } from '@/contexts/cart-context';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Search, ShoppingCart, Heart, Menu, X, User } from 'lucide-react';
import LanguageSwitcher from '@/components/ui/language-switcher';
import SearchBar from '@/components/ui/search-bar';
import MobileMenu from '@/components/layout/mobile-menu';

export default function Header() {
  const { t, lang, dir } = useLanguage();
  const { cartItems } = useCart();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
          </Button>
          
          <Link href={`/${lang}`} className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="font-bold text-2xl">{t.site_name}</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
          <Link href={`/${lang}`} className="font-medium transition-colors hover:text-primary">
            {t.nav_home}
          </Link>
          <Link href={`/${lang}/shop`} className="font-medium transition-colors hover:text-primary">
            {t.nav_shop}
          </Link>
          <Link href={`/${lang}/categories`} className="font-medium transition-colors hover:text-primary">
            {t.nav_categories}
          </Link>
          <Link href={`/${lang}/offers`} className="font-medium transition-colors hover:text-primary">
            {t.nav_offers}
          </Link>
          <Link href={`/${lang}/blog`} className="font-medium transition-colors hover:text-primary">
            {t.nav_blog}
          </Link>
        </nav>
        
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Button variant="ghost" size="icon" onClick={toggleSearch}>
            <Search className="h-5 w-5" />
          </Button>
          
          <Link href={`/${lang}/wishlist`}>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>
          
          <Link href={`/${lang}/cart`}>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </Link>
          
          {user ? (
            <Link href={`/${lang}/account`}>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link href={`/${lang}/login`}>
              <Button variant="outline" size="sm">
                {t.login}
              </Button>
            </Link>
          )}
          
          <LanguageSwitcher />
        </div>
      </div>
      
      {isSearchOpen && (
        <div className="border-b border-border">
          <div className="container py-4">
            <SearchBar onClose={toggleSearch} />
          </div>
        </div>
      )}
      
      {isMenuOpen && <MobileMenu onClose={toggleMenu} />}
    </header>
  );
}