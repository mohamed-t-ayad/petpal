import CategoryCard from '@/components/categories/CategoryCard';
import { categories } from '@/lib/data';
import { getDictionary } from "@/lib/dictionaries";

interface Props {
  params: {
    lang: string;
  };
}

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'ar' },
  ];
}

const CategoriesPage = ({ params }: Props) => {
  const { lang } = params;
  const isArabic = lang === 'ar';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={isArabic ? category.nameAr : category.name}
            description={isArabic ? category.descriptionAr : category.description}
            image={category.image}
            lang={lang} // 👈 pass lang to CategoryCard
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
