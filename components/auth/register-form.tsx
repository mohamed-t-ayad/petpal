'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface RegisterFormProps {
  lang: string;
  t: Record<string, string>;
}

export default function RegisterForm({ lang, t }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, isLoading } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: lang === 'en' ? 'Passwords do not match' : 'كلمات المرور غير متطابقة',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      await register(name, email, password);
      toast({
        title: lang === 'en' ? 'Registration successful' : 'تم التسجيل بنجاح',
        description: lang === 'en' 
          ? 'Your account has been created.' 
          : 'تم إنشاء حسابك.'
      });
    } catch (error) {
      toast({
        title: lang === 'en' ? 'Registration failed' : 'فشل التسجيل',
        description: lang === 'en' 
          ? 'Please try again later.' 
          : 'يرجى المحاولة مرة أخرى لاحقًا.',
        variant: 'destructive'
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">
          {lang === 'en' ? 'Name' : 'الاسم'}
        </Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={lang === 'en' ? 'Enter your name' : 'أدخل اسمك'}
          required
        />
      </div>
      
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
        <Label htmlFor="password">
          {lang === 'en' ? 'Password' : 'كلمة المرور'}
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={lang === 'en' ? 'Create a password' : 'أنشئ كلمة مرور'}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">
          {lang === 'en' ? 'Confirm Password' : 'تأكيد كلمة المرور'}
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder={lang === 'en' ? 'Confirm your password' : 'أكد كلمة المرور'}
          required
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {lang === 'en' ? 'Creating account...' : 'جاري إنشاء الحساب...'}
          </>
        ) : (
          t.register
        )}
      </Button>
      
      <div className="text-center text-sm">
        <span className="text-muted-foreground">
          {lang === 'en' ? 'Already have an account?' : 'لديك حساب بالفعل؟'}{' '}
        </span>
        <Link 
          href={`/${lang}/login`}
          className="text-primary hover:underline"
        >
          {t.login}
        </Link>
      </div>
    </form>
  );
}