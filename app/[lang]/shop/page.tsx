import { getDictionary } from "@/lib/dictionaries";
import { featuredProducts } from "@/lib/data";
import ProductGrid from "@/components/product/product-grid";
import ProductFilters from "@/components/product/product-filters";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}
export default async function ShopPage({
  params,
}: {
  params: { lang: string };
}) {
  const lang = params.lang || "en";
  const t = await getDictionary(lang);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">{t.nav_shop}</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <ProductFilters lang={lang} t={t} />
        </div>

        <div className="w-full md:w-3/4">
          <ProductGrid products={featuredProducts} lang={lang} t={t} />
        </div>
      </div>
    </div>
  );
}
