'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const { t, lang } = useLanguage();

  // Close menu when pressing escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-background md:hidden">
      <div className="container flex h-16 items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center space-x-2" onClick={onClose}>
          <span className="font-bold text-2xl">{t.site_name}</span>
        </Link>
        
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>
      
      <nav className="container grid gap-6 py-6">
        <Link 
          href={`/${lang}`} 
          className="flex items-center text-lg font-semibold" 
          onClick={onClose}
        >
          {t.nav_home}
        </Link>
        <Link 
          href={`/${lang}/shop`} 
          className="flex items-center text-lg font-semibold" 
          onClick={onClose}
        >
          {t.nav_shop}
        </Link>
        
        <div className="border-t border-border pt-4">
          <h3 className="text-lg font-semibold mb-4">{t.nav_categories}</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link 
              href={`/${lang}/category/dogs`} 
              className="text-base" 
              onClick={onClose}
            >
              {t.nav_dogs}
            </Link>
            <Link 
              href={`/${lang}/category/cats`} 
              className="text-base" 
              onClick={onClose}
            >
              {t.nav_cats}
            </Link>
            <Link 
              href={`/${lang}/category/birds`} 
              className="text-base" 
              onClick={onClose}
            >
              {t.nav_birds}
            </Link>
            <Link 
              href={`/${lang}/category/fish`} 
              className="text-base" 
              onClick={onClose}
            >
              {t.nav_fish}
            </Link>
            <Link 
              href={`/${lang}/category/small-pets`} 
              className="text-base" 
              onClick={onClose}
            >
              {t.nav_small_pets}
            </Link>
          </div>
        </div>
        
        <div className="border-t border-border pt-4">
          <Link 
            href={`/${lang}/offers`} 
            className="flex items-center text-lg font-semibold" 
            onClick={onClose}
          >
            {t.nav_offers}
          </Link>
          <Link 
            href={`/${lang}/blog`} 
            className="flex items-center text-lg font-semibold mt-4" 
            onClick={onClose}
          >
            {t.nav_blog}
          </Link>
          <Link 
            href={`/${lang}/contact`} 
            className="flex items-center text-lg font-semibold mt-4" 
            onClick={onClose}
          >
            {t.nav_contact}
          </Link>
        </div>
      </nav>
    </div>
  );
}