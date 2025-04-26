'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  Tag,
  BarChart3,
  MessageSquare,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const { lang } = useLanguage();
  
  const navItems = [
    {
      id: 'dashboard',
      label: lang === 'en' ? 'Dashboard' : 'لوحة التحكم',
      icon: LayoutDashboard
    },
    {
      id: 'products',
      label: lang === 'en' ? 'Products' : 'المنتجات',
      icon: Package
    },
    {
      id: 'orders',
      label: lang === 'en' ? 'Orders' : 'الطلبات',
      icon: ShoppingCart
    },
    {
      id: 'customers',
      label: lang === 'en' ? 'Customers' : 'العملاء',
      icon: Users
    },
    {
      id: 'categories',
      label: lang === 'en' ? 'Categories' : 'التصنيفات',
      icon: Tag
    },
    {
      id: 'marketing',
      label: lang === 'en' ? 'Marketing' : 'التسويق',
      icon: BarChart3
    },
    {
      id: 'messages',
      label: lang === 'en' ? 'Messages' : 'الرسائل',
      icon: MessageSquare
    },
    {
      id: 'localization',
      label: lang === 'en' ? 'Localization' : 'الترجمة',
      icon: Globe
    },
    {
      id: 'settings',
      label: lang === 'en' ? 'Settings' : 'الإعدادات',
      icon: Settings
    }
  ];
  
  return (
    <div className="w-64 hidden md:flex flex-col h-screen bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <Link href={`/${lang}/admin`} className="font-bold text-xl">
          {lang === 'en' ? 'PetPal Admin' : 'بيت بال المشرف'}
        </Link>
      </div>
      
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "justify-start",
                activeTab === item.id && "bg-muted"
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="mr-2 h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </nav>
        
        <Separator className="my-4" />
        
        <div className="px-4">
          <h4 className="mb-2 text-xs font-semibold">
            {lang === 'en' ? 'Dropshipping Partners' : 'شركاء دروبشيبينج'}
          </h4>
          <nav className="grid gap-1 px-2">
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => setActiveTab('dropshipping')}
            >
              <Package className="mr-2 h-5 w-5" />
              {lang === 'en' ? 'Manage Partners' : 'إدارة الشركاء'}
            </Button>
          </nav>
        </div>
      </div>
      
      <div className="border-t p-4">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/${lang}`}>
            {lang === 'en' ? 'Return to Store' : 'العودة إلى المتجر'}
          </Link>
        </Button>
      </div>
    </div>
  );
}