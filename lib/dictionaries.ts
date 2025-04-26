type Dictionary = Record<string, string>;

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  en: () => import('@/locales/en.json').then((module) => module.default),
  ar: () => import('@/locales/ar.json').then((module) => module.default),
};

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  try {
    return await dictionaries[locale]();
  } catch (error) {
    console.error(`Failed to load dictionary for locale: ${locale}`, error);
    // Fallback to English dictionary
    return await dictionaries.en();
  }
};