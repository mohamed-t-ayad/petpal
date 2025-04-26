import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '@/lib/dictionaries';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { featuredProducts } from '@/lib/data';

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'ar' }
  ];
}

export default async function HomePage({ params }: { params: { lang: string } }) {
  const lang = params.lang || 'en';
  const t = await getDictionary(lang);
  const isRtl = lang === 'ar';
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container h-full flex flex-col justify-center">
          <div className={`max-w-xl ${isRtl ? 'ml-auto text-right' : ''}`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {lang === 'en' ? 'Everything Your Pet Needs' : 'كل ما يحتاجه حيوانك الأليف'}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {lang === 'en' 
                ? 'Shop the best selection of pet food, toys, accessories and more.'
                : 'تسوق أفضل تشكيلة من أغذية الحيوانات الأليفة والألعاب والإكسسوارات والمزيد.'
              }
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <Button asChild size="lg">
                <Link href={`/${lang}/shop`}>
                  {t.nav_shop}
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link href={`/${lang}/categories`}>
                  {t.nav_categories}
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-[-1] overflow-hidden">
          <div className={`absolute w-1/2 h-full ${isRtl ? 'left-0' : 'right-0'}`}>
            <Image 
              src="https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg" 
              alt="Pet hero" 
              fill 
              className="object-cover" 
              priority
            />
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">{t.nav_categories}</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['dogs', 'cats', 'birds', 'fish', 'small_pets'].map((category) => (
              <Link key={category} href={`/${lang}/category/${category}`}>
                <Card className="h-40 overflow-hidden transition hover:shadow-lg">
                  <div className="relative h-full">
                    <Image 
                      src={`https://images.pexels.com/photos/${
                        category === 'dogs' ? '1108099/pexels-photo-1108099.jpeg' :
                        category === 'cats' ? '320014/pexels-photo-320014.jpeg' :
                        category === 'birds' ? '1405930/pexels-photo-1405930.jpeg' :
                        category === 'fish' ? '128756/pexels-photo-128756.jpeg' :
                        '4054781/pexels-photo-4054781.jpeg'
                      }`}
                      alt={category}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex items-end p-4">
                      <h3 className="text-white font-semibold">{t[`nav_${category}`]}</h3>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">{t.featured_products}</h2>
            <Button variant="ghost" asChild>
              <Link href={`/${lang}/shop`} className="flex items-center">
                {t.nav_shop} {isRtl ? <ChevronRight className="ml-1 rtl:rotate-180" /> : <ChevronRight className="ml-1" />}
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/${lang}/product/${product.id}`}>
                <Card className="h-full overflow-hidden transition hover:shadow-md">
                  <div className="aspect-square relative">
                    <Image 
                      src={product.image}
                      alt={product.name}
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
                      <span className="font-bold">
                        ${product.price.toFixed(2)}
                      </span>
                      <Button size="sm" variant="outline">
                        {t.add_to_cart}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Banner */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container flex flex-col md:flex-row items-center">
          <div className={`md:w-1/2 ${isRtl ? 'md:order-2' : ''}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {lang === 'en' ? 'Special Offers This Week' : 'عروض خاصة هذا الأسبوع'}
            </h2>
            <p className="text-muted-foreground mb-8">
              {lang === 'en' 
                ? 'Get up to 30% off on selected premium pet food and accessories.'
                : 'احصل على خصم يصل إلى 30٪ على أغذية وإكسسوارات الحيوانات الأليفة المميزة.'
              }
            </p>
            <Button asChild>
              <Link href={`/${lang}/offers`}>
                {t.nav_offers}
              </Link>
            </Button>
          </div>
          <div className={`md:w-1/2 mt-8 md:mt-0 ${isRtl ? 'md:order-1' : ''}`}>
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image 
                src="https://images.pexels.com/photos/6816860/pexels-photo-6816860.jpeg"
                alt="Special offers"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Blog previews */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">{t.nav_blog}</h2>
            <Button variant="ghost" asChild>
              <Link href={`/${lang}/blog`} className="flex items-center">
                {lang === 'en' ? 'View All' : 'عرض الكل'} {isRtl ? <ChevronRight className="ml-1 rtl:rotate-180" /> : <ChevronRight className="ml-1" />}
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((post) => (
              <Card key={post} className="overflow-hidden transition hover:shadow-md">
                <div className="aspect-video relative">
                  <Image 
                    src={`https://images.pexels.com/photos/${
                      post === 1 ? '1741205/pexels-photo-1741205.jpeg' :
                      post === 2 ? '6131189/pexels-photo-6131189.jpeg' :
                      '3361739/pexels-photo-3361739.jpeg'
                    }`}
                    alt={`Blog post ${post}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">
                    {lang === 'en'
                      ? post === 1 ? 'Essential Dog Care Tips' :
                        post === 2 ? 'Choosing the Right Cat Food' :
                        'Setting Up Your First Aquarium'
                      : post === 1 ? 'نصائح أساسية للعناية بالكلاب' :
                        post === 2 ? 'اختيار الطعام المناسب للقطط' :
                        'إعداد حوض السمك الأول الخاص بك'
                    }
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {lang === 'en'
                      ? post === 1 ? 'Learn the basics of keeping your canine companion healthy and happy.' :
                        post === 2 ? 'A guide to understanding your cat\'s nutritional needs.' :
                        'Everything you need to know to successfully set up your first fish tank.'
                      : post === 1 ? 'تعلم أساسيات الحفاظ على رفيقك من الكلاب بصحة جيدة وسعادة.' :
                        post === 2 ? 'دليل لفهم احتياجات قطتك الغذائية.' :
                        'كل ما تحتاج لمعرفته لإعداد حوض السمك الأول بنجاح.'
                    }
                  </p>
                  <Button asChild variant="link" className={`p-0 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <Link href={`/${lang}/blog/post-${post}`}>
                      {lang === 'en' ? 'Read More' : 'اقرأ المزيد'} {isRtl ? <ChevronRight className="ml-1 rtl:rotate-180" /> : <ChevronRight className="ml-1" />}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}