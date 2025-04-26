import { getDictionary } from '@/lib/dictionaries';
import RegisterForm from '@/components/auth/register-form';

export function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'ar' }
  ];
}

export default async function RegisterPage({ params }: { params: { lang: string } }) {
  const lang = params.lang || 'en';
  const t = await getDictionary(lang);
  
  return (
    <div className="container flex flex-col items-center justify-center py-12 md:py-24">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">{t.register}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {lang === 'en' 
              ? 'Create an account to start shopping' 
              : 'أنشئ حسابًا لتبدأ التسوق'
            }
          </p>
        </div>
        
        <RegisterForm lang={lang} t={t} />
      </div>
    </div>
  );
}