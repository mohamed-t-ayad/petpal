'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  Calendar
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock data for charts
const salesData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const categoryData = [
  { name: 'Dogs', value: 40 },
  { name: 'Cats', value: 30 },
  { name: 'Birds', value: 15 },
  { name: 'Fish', value: 10 },
  { name: 'Small Pets', value: 5 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export default function AdminDashboard() {
  const { lang } = useLanguage();
  const [period, setPeriod] = useState('week');
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {lang === 'en' ? 'Dashboard' : 'لوحة التحكم'}
        </h2>
        <Tabs defaultValue="week" value={period} onValueChange={setPeriod}>
          <TabsList>
            <TabsTrigger value="day">
              {lang === 'en' ? 'Day' : 'يوم'}
            </TabsTrigger>
            <TabsTrigger value="week">
              {lang === 'en' ? 'Week' : 'أسبوع'}
            </TabsTrigger>
            <TabsTrigger value="month">
              {lang === 'en' ? 'Month' : 'شهر'}
            </TabsTrigger>
            <TabsTrigger value="year">
              {lang === 'en' ? 'Year' : 'سنة'}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {lang === 'en' ? 'Total Revenue' : 'إجمالي الإيرادات'}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              {lang === 'en' ? '+20.1% from last month' : '+20.1% من الشهر الماضي'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {lang === 'en' ? 'Orders' : 'الطلبات'}
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              {lang === 'en' ? '+12% from last month' : '+12% من الشهر الماضي'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {lang === 'en' ? 'Products' : 'المنتجات'}
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">
              {lang === 'en' ? '12 out of stock' : '12 نفذت من المخزون'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {lang === 'en' ? 'Customers' : 'العملاء'}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              {lang === 'en' ? '+18.2% from last month' : '+18.2% من الشهر الماضي'}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>
              {lang === 'en' ? 'Sales Overview' : 'نظرة عامة على المبيعات'}
            </CardTitle>
            <CardDescription>
              {lang === 'en' 
                ? `${period === 'day' ? 'Daily' : period === 'week' ? 'Weekly' : period === 'month' ? 'Monthly' : 'Yearly'} sales overview` 
                : `نظرة عامة على المبيعات ${period === 'day' ? 'اليومية' : period === 'week' ? 'الأسبوعية' : period === 'month' ? 'الشهرية' : 'السنوية'}`
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={salesData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>
              {lang === 'en' ? 'Sales by Category' : 'المبيعات حسب الفئة'}
            </CardTitle>
            <CardDescription>
              {lang === 'en' 
                ? 'Distribution of sales across different product categories' 
                : 'توزيع المبيعات عبر مختلف فئات المنتجات'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="h-[250px] w-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>
            {lang === 'en' ? 'Recent Orders' : 'الطلبات الأخيرة'}
          </CardTitle>
          <CardDescription>
            {lang === 'en' 
              ? 'You have 6 new orders today'
              : 'لديك 6 طلبات جديدة اليوم'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-medium py-3 px-2">
                    {lang === 'en' ? 'Order ID' : 'رقم الطلب'}
                  </th>
                  <th className="text-left font-medium py-3 px-2">
                    {lang === 'en' ? 'Customer' : 'العميل'}
                  </th>
                  <th className="text-left font-medium py-3 px-2">
                    {lang === 'en' ? 'Status' : 'الحالة'}
                  </th>
                  <th className="text-left font-medium py-3 px-2">
                    {lang === 'en' ? 'Date' : 'التاريخ'}
                  </th>
                  <th className="text-left font-medium py-3 px-2">
                    {lang === 'en' ? 'Amount' : 'المبلغ'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="border-b">
                    <td className="py-3 px-2">#{10000 + i}</td>
                    <td className="py-3 px-2">
                      {lang === 'en' 
                        ? `Customer ${i}` 
                        : `العميل ${i}`
                      }
                    </td>
                    <td className="py-3 px-2">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        i % 3 === 0 
                          ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300' 
                          : i % 3 === 1 
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-800/20 dark:text-orange-300' 
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-300'
                      }`}>
                        {i % 3 === 0 
                          ? lang === 'en' ? 'Completed' : 'مكتمل' 
                          : i % 3 === 1 
                            ? lang === 'en' ? 'Processing' : 'قيد المعالجة' 
                            : lang === 'en' ? 'Shipped' : 'تم الشحن'
                        }
                      </span>
                    </td>
                    <td className="py-3 px-2">2023-08-{10 + i}</td>
                    <td className="py-3 px-2">${(Math.random() * 200 + 50).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}