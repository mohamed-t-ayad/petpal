import './globals.css';
import type { Metadata } from 'next';
import { Inter, Cairo } from 'next/font/google';
import { Providers } from '@/components/providers/providers';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo' });

export const metadata: Metadata = {
  title: 'PetPal | Pet Products Store',
  description: 'Your one-stop shop for all pet products, toys, and accessories.',
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang = params.lang || 'en';
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body className={`${inter.variable} ${cairo.variable} font-sans min-h-screen flex flex-col`}>
        <Providers>
          <Header />
          <main className="flex-grow px-10">
            {children}
          </main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}