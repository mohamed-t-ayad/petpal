'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface LoginFormProps {
  lang: string;
  t: Record<string, string>;
}

export default function LoginForm({ lang, t }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      toast({
        title: lang === 'en' ? 'Login successful' : 'تم تسجيل الدخول بنجاح',
        description: lang === 'en' 
          ? 'You have been logged in to your account.' 
          : 'لقد تم تسجيل دخولك إلى حسابك.'
      });
    } catch (error) {
      toast({
        title: lang === 'en' ? 'Login failed' : 'فشل تسجيل الدخول',
        description: lang === 'en' 
          ? 'Invalid email or password.' 
          : 'البريد الإلكتروني أو كلمة المرور غير صالحة.',
        variant: 'destructive'
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">
          {lang === 'en' ? 'Email' : 'البريد الإلكتروني'}
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={lang === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
          required
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">
            {lang === 'en' ? 'Password' : 'كلمة المرور'}
          </Label>
          <Link 
            href={`/${lang}/reset-password`}
            className="text-sm text-primary hover:underline"
          >
            {lang === 'en' ? 'Forgot password?' : 'نسيت كلمة المرور؟'}
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={lang === 'en' ? 'Enter your password' : 'أدخل كلمة المرور'}
          required
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {lang === 'en' ? 'Logging in...' : 'جاري تسجيل الدخول...'}
          </>
        ) : (
          t.login
        )}
      </Button>
      
      <div className="text-center text-sm">
        <span className="text-muted-foreground">
          {lang === 'en' ? "Don't have an account?" : 'ليس لديك حساب؟'}{' '}
        </span>
        <Link 
          href={`/${lang}/register`}
          className="text-primary hover:underline"
        >
          {t.register}
        </Link>
      </div>
    </form>
  );
}