'use client';

import { ThemeProvider } from 'next-themes';
import { CartProvider } from '@/contexts/cart-context';
import { LanguageProvider } from '@/contexts/language-context';
import { AuthProvider } from '@/contexts/auth-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}