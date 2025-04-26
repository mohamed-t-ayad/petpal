'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Search, User } from 'lucide-react';

export default function AdminHeader() {
  const { user, logout } = useAuth();
  const { lang } = useLanguage();
  
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link href={`/${lang}/admin`} className="flex items-center mr-4">
            <span className="font-bold text-lg hidden md:inline-block">
              {lang === 'en' ? 'PetPal Admin' : 'بيت بال المشرف'}
            </span>
          </Link>
          
          <div className="relative hidden md:flex w-full max-w-sm items-center">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={lang === 'en' ? "Search..." : "بحث..."} 
              className="pl-8" 
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/${lang}/admin/settings`}>
                  {lang === 'en' ? 'Settings' : 'الإعدادات'}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                {lang === 'en' ? 'Log out' : 'تسجيل الخروج'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button asChild variant="ghost" size="sm" className="hidden md:flex">
            <Link href={`/${lang}`}>
              {lang === 'en' ? 'View Store' : 'عرض المتجر'}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}