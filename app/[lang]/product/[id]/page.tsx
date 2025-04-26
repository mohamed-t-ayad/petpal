import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/dictionaries';
import { featuredProducts } from '@/lib/data';
import ProductDetails from '@/components/product/product-details';
import RelatedProducts from '@/components/product/related-products';
import { Separator } from '@/components/ui/separator';
import { ChevronRight } from 'lucide-react';

export function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'ar' }
  ];
}
export default async function ProductPage({ 
  params 
}: { 
  params: { lang: string; id: string } 
}) {
  const lang = params.lang || 'en';
  const t = await getDictionary(lang);
  
  const product = featuredProducts.find((p) => p.id === params.id);
  
  if (!product) {
    notFound();
  }
  
  const relatedProducts = featuredProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  const productName = lang === 'ar' ? product.nameAr : product.name;
  const categoryName = lang === 'ar' ? product.categoryAr : product.category;
  const isRtl = lang === 'ar';
  
  return (
    <div className="container py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-8 space-x-1 rtl:space-x-reverse">
        <Link href={`/${lang}`} className="hover:text-foreground">
          {t.nav_home}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/${lang}/shop`} className="hover:text-foreground">
          {t.nav_shop}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link 
          href={`/${lang}/category/${product.category.toLowerCase()}`}
          className="hover:text-foreground"
        >
          {categoryName}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">{productName}</span>
      </div>
      
      {/* Product Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="aspect-square relative rounded-lg overflow-hidden">
          <Image 
            src={product.image}
            alt={productName}
            fill
            className="object-cover"
            priority
          />
          {product.sale && (
            <span className="absolute top-4 right-4 rtl:left-4 rtl:right-auto bg-destructive text-destructive-foreground px-3 py-1 rounded-full">
              {t.sale}
            </span>
          )}
        </div>
        
        <ProductDetails product={product} lang={lang} t={t} />
      </div>
      
      {/* Product Description */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">{t.product_description}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {lang === 'ar' ? product.descriptionAr : product.description}
          {/* Added more detailed description */}
          {lang === 'en' 
            ? ` Our ${product.name.toLowerCase()} is designed to meet the highest standards of quality and safety for your pet. Made with premium materials and expert craftsmanship, this product is both durable and practical for everyday use. Whether your pet is active or relaxed, this product will complement their lifestyle perfectly.`
            : ` تم تصميم ${product.nameAr} لتلبية أعلى معايير الجودة والسلامة لحيوانك الأليف. مصنوع من مواد متميزة وحرفية خبيرة، هذا المنتج متين وعملي للاستخدام اليومي. سواء كان حيوانك الأليف نشيطًا أو مسترخيًا، سيكمل هذا المنتج نمط حياتهم بشكل مثالي.`
          }
        </p>
      </div>
      
      <Separator className="my-8" />
      
      {/* Related Products */}
      <RelatedProducts products={relatedProducts} lang={lang} t={t} />
    </div>
  );
}