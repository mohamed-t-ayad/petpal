'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { BarChart3, Users, Package, ShoppingCart, DollarSign, Settings } from 'lucide-react';
import AdminHeader from '@/components/admin/admin-header';
import AdminSidebar from '@/components/admin/admin-sidebar';
import AdminDashboard from '@/components/admin/admin-dashboard';

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'ar' },
  ];
}
export default function AdminPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  useEffect(() => {
    // Redirect non-admin users
    if (!user || !isAdmin) {
      router.push(`/${lang}`);
    }
  }, [user, isAdmin, router, lang]);
  
  if (!user || !isAdmin) {
    return null;
  }
  
  return (
    <div className="flex min-h-screen bg-muted/40">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1">
        <AdminHeader />
        
        <main className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsContent value="dashboard" className="space-y-4">
              <AdminDashboard />
            </TabsContent>
            
            <TabsContent value="products" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {lang === 'en' ? 'Products' : 'المنتجات'}
                </h2>
                <Button>
                  {lang === 'en' ? 'Add New Product' : 'إضافة منتج جديد'}
                </Button>
              </div>
              <Separator />
              <Card>
                <CardHeader>
                  <CardTitle>
                    {lang === 'en' ? 'Product Management' : 'إدارة المنتجات'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {lang === 'en' 
                      ? 'Product management functionality will be implemented here.' 
                      : 'سيتم تنفيذ وظائف إدارة المنتجات هنا.'
                    }
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="orders" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {lang === 'en' ? 'Orders' : 'الطلبات'}
                </h2>
              </div>
              <Separator />
              <Card>
                <CardHeader>
                  <CardTitle>
                    {lang === 'en' ? 'Order Management' : 'إدارة الطلبات'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {lang === 'en' 
                      ? 'Order management functionality will be implemented here.' 
                      : 'سيتم تنفيذ وظائف إدارة الطلبات هنا.'
                    }
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="customers" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {lang === 'en' ? 'Customers' : 'العملاء'}
                </h2>
              </div>
              <Separator />
              <Card>
                <CardHeader>
                  <CardTitle>
                    {lang === 'en' ? 'Customer Management' : 'إدارة العملاء'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {lang === 'en' 
                      ? 'Customer management functionality will be implemented here.' 
                      : 'سيتم تنفيذ وظائف إدارة العملاء هنا.'
                    }
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {lang === 'en' ? 'Settings' : 'الإعدادات'}
                </h2>
              </div>
              <Separator />
              <Card>
                <CardHeader>
                  <CardTitle>
                    {lang === 'en' ? 'Store Settings' : 'إعدادات المتجر'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {lang === 'en' 
                      ? 'Store settings functionality will be implemented here.' 
                      : 'سيتم تنفيذ وظائف إعدادات المتجر هنا.'
                    }
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}