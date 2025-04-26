import Link from 'next/link';

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  lang: string; // Add lang
}

const CategoryCard = ({ id, name, description, image, lang }: CategoryCardProps) => {
  return (
    <Link href={`/${lang}/categories/${id}`}>
      <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{name}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
