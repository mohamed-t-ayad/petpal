import { getDictionary } from '@/lib/dictionaries';
import LoginForm from '@/components/auth/login-form';

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'ar' }
  ];
}

export default async function LoginPage({ params }: { params: { lang: string } }) {
  const lang = params.lang || 'en';
  const t = await getDictionary(lang);
  
  return (
    <div className="container flex flex-col items-center justify-center py-12 md:py-24">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">{t.login}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {lang === 'en' 
              ? 'Enter your credentials to access your account' 
              : 'أدخل بيانات الاعتماد الخاصة بك للوصول إلى حسابك'
            }
          </p>
        </div>
        
        <LoginForm lang={lang} t={t} />
      </div>
    </div>
  );
}