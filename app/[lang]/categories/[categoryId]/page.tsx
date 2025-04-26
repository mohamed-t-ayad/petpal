import { categories } from '@/lib/data'; // Your existing categories data
import { notFound } from 'next/navigation';
import { getDictionary } from "@/lib/dictionaries";

// export async function generateStaticParams() {
//   return [
//     { lang: 'en' },
//     { lang: 'ar' },
//   ];
// }

interface Props {
  params: {
    lang: string;
    categoryId: string;
  };
}

export async function generateStaticParams() {
  const langs = ['en', 'ar'];

  return langs.flatMap((lang) =>
    categories.map((category) => ({
      lang,
      categoryId: category.id,
    }))
  );
}

export default function CategoryPage({ params }: Props) {
  const { lang, categoryId } = params;

  const category = categories.find((cat) => cat.id === categoryId);

  if (!category) return notFound();

  const isArabic = lang === 'ar';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center">
        {isArabic ? category.nameAr : category.name}
      </h1>
      <div className="relative w-full h-64 mb-8">
        <img
          src={category.image}
          alt={isArabic ? category.nameAr : category.name}
          className="object-cover w-full h-full rounded-2xl"
        />
      </div>
      <p className="text-center text-gray-600 text-lg">
        {isArabic ? category.descriptionAr : category.description}
      </p>
    </div>
  );
}
