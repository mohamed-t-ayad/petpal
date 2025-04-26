import  CartPage  from './cart-page';


export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }];
}

export default function CartPageWrapper({ params }: { params: { lang: string } }) {
  return <CartPage />;
}
