import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';

interface RelatedProductsProps {
  products: Product[];
  lang: string;
  t: Record<string, string>;
}

export default function RelatedProducts({ products, lang, t }: RelatedProductsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{t.related_products}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link 
            key={product.id} 
            href={`/${lang}/product/${product.id}`}
          >
            <Card className="h-full overflow-hidden transition hover:shadow-md">
              <div className="aspect-square relative">
                <Image 
                  src={product.image}
                  alt={lang === 'ar' ? product.nameAr : product.name}
                  fill
                  className="object-cover"
                />
                {product.sale && (
                  <span className="absolute top-2 right-2 rtl:left-2 rtl:right-auto bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded">
                    {t.sale}
                  </span>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                  {lang === 'ar' ? product.nameAr : product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-2 line-clamp-1">
                  {lang === 'ar' ? product.categoryAr : product.category}
                </p>
                <div className="flex items-center justify-between">
                  {product.sale ? (
                    <div className="flex flex-col">
                      <span className="font-bold">
                        ${product.salePrice?.toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}