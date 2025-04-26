'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getDictionary } from '@/lib/dictionaries';

type Language = 'en' | 'ar';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  lang: Language;
  dir: Direction;
  t: Record<string, string>;
  switchLanguage: (newLang: Language) => void;
}

const defaultContext: LanguageContextType = {
  lang: 'en',
  dir: 'ltr',
  t: {},
  switchLanguage: () => {},
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [lang, setLang] = useState<Language>('en');
  const [dir, setDir] = useState<Direction>('ltr');
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    // Detect language from URL or localStorage
    const savedLang = localStorage.getItem('language') as Language;
    const detectedLang = savedLang || 
      (pathname.startsWith('/ar') ? 'ar' : 'en');
    
    setLang(detectedLang);
    setDir(detectedLang === 'ar' ? 'rtl' : 'ltr');
    loadTranslations(detectedLang);
    
    // Set HTML attributes
    document.documentElement.lang = detectedLang;
    document.documentElement.dir = detectedLang === 'ar' ? 'rtl' : 'ltr';
  }, [pathname]);

  const loadTranslations = async (language: Language) => {
    try {
      const dictionary = await getDictionary(language);
      setTranslations(dictionary);
    } catch (error) {
      console.error('Failed to load translations:', error);
    }
  };

  const switchLanguage = (newLang: Language) => {
    localStorage.setItem('language', newLang);
    setLang(newLang);
    setDir(newLang === 'ar' ? 'rtl' : 'ltr');
    loadTranslations(newLang);
    
    // Update URL to reflect language
    const newPathname = pathname.replace(/^\/(en|ar)/, `/${newLang}`);
    router.push(newPathname);
    
    // Update HTML attributes
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <LanguageContext.Provider value={{ lang, dir, t: translations, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);