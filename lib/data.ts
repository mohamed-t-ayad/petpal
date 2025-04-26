export interface Product {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  image: string;
  category: string;
  categoryAr: string;
  stock: number;
  sale?: boolean;
  salePrice?: number;
}

export const featuredProducts: Product[] = [
  {
    id: 'premium-dog-food',
    name: 'Premium Dog Food',
    nameAr: 'طعام كلاب فاخر',
    description: 'High-quality dog food with balanced nutrition for your pet.',
    descriptionAr: 'طعام كلاب عالي الجودة بتغذية متوازنة لحيوانك الأليف.',
    price: 49.99,
    image: 'https://images.pexels.com/photos/5945559/pexels-photo-5945559.jpeg',
    category: 'Dogs',
    categoryAr: 'الكلاب',
    stock: 50,
    sale: true,
    salePrice: 39.99
  },
  {
    id: 'cat-scratching-post',
    name: 'Cat Scratching Post',
    nameAr: 'عمود خدش للقطط',
    description: 'A durable scratching post to keep your cat entertained.',
    descriptionAr: 'عمود خدش متين للحفاظ على قطتك مستمتعة.',
    price: 29.99,
    image: 'https://images.pexels.com/photos/7725968/pexels-photo-7725968.jpeg',
    category: 'Cats',
    categoryAr: 'القطط',
    stock: 30
  },
  {
    id: 'bird-cage-large',
    name: 'Large Bird Cage',
    nameAr: 'قفص طيور كبير',
    description: 'Spacious cage for birds with multiple perches and feeders.',
    descriptionAr: 'قفص واسع للطيور مع مجاثم ومغذيات متعددة.',
    price: 89.99,
    image: 'https://images.pexels.com/photos/2662436/pexels-photo-2662436.jpeg',
    category: 'Birds',
    categoryAr: 'الطيور',
    stock: 15
  },
  {
    id: 'fish-tank-starter',
    name: 'Fish Tank Starter Kit',
    nameAr: 'مجموعة حوض سمك للمبتدئين',
    description: 'Everything you need to start your first aquarium.',
    descriptionAr: 'كل ما تحتاجه لبدء حوض السمك الأول الخاص بك.',
    price: 119.99,
    image: 'https://images.pexels.com/photos/3016396/pexels-photo-3016396.jpeg',
    category: 'Fish',
    categoryAr: 'الأسماك',
    stock: 10,
    sale: true,
    salePrice: 99.99
  },
  {
    id: 'hamster-wheel',
    name: 'Hamster Exercise Wheel',
    nameAr: 'عجلة تمارين للهامستر',
    description: 'Silent spinning wheel for small pets to exercise.',
    descriptionAr: 'عجلة دوران صامتة للحيوانات الأليفة الصغيرة لممارسة الرياضة.',
    price: 14.99,
    image: 'https://images.pexels.com/photos/4588465/pexels-photo-4588465.jpeg',
    category: 'Small Pets',
    categoryAr: 'الحيوانات الصغيرة',
    stock: 25
  },
  {
    id: 'dog-toy-set',
    name: 'Dog Toy Set',
    nameAr: 'مجموعة ألعاب للكلاب',
    description: 'A set of durable toys for your dog.',
    descriptionAr: 'مجموعة من الألعاب المتينة لكلبك.',
    price: 24.99,
    image: 'https://images.pexels.com/photos/4587992/pexels-photo-4587992.jpeg',
    category: 'Dogs',
    categoryAr: 'الكلاب',
    stock: 40
  },
  {
    id: 'cat-bed-premium',
    name: 'Premium Cat Bed',
    nameAr: 'سرير قطط فاخر',
    description: 'Soft and comfortable bed for your cat.',
    descriptionAr: 'سرير ناعم ومريح لقطتك.',
    price: 34.99,
    image: 'https://images.pexels.com/photos/6413683/pexels-photo-6413683.jpeg',
    category: 'Cats',
    categoryAr: 'القطط',
    stock: 20,
    sale: true,
    salePrice: 29.99
  },
  {
    id: 'reptile-heat-lamp',
    name: 'Reptile Heat Lamp',
    nameAr: 'مصباح حراري للزواحف',
    description: 'Heat lamp for reptiles with adjustable temperature.',
    descriptionAr: 'مصباح حراري للزواحف مع درجة حرارة قابلة للتعديل.',
    price: 39.99,
    image: 'https://images.pexels.com/photos/9873621/pexels-photo-9873621.jpeg',
    category: 'Reptiles',
    categoryAr: 'الزواحف',
    stock: 15
  }
];

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  image: string;
  description: string;
  descriptionAr: string;
}

export const categories: Category[] = [
  {
    id: 'dogs',
    name: 'Dogs',
    nameAr: 'الكلاب',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
    description: 'Everything your canine companion needs',
    descriptionAr: 'كل ما يحتاجه رفيقك من الكلاب'
  },
  {
    id: 'cats',
    name: 'Cats',
    nameAr: 'القطط',
    image: 'https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg',
    description: 'Products for your feline friends',
    descriptionAr: 'منتجات لأصدقائك من القطط'
  },
  {
    id: 'birds',
    name: 'Birds',
    nameAr: 'الطيور',
    image: 'https://images.pexels.com/photos/1405930/pexels-photo-1405930.jpeg',
    description: 'Supplies for your feathered pets',
    descriptionAr: 'مستلزمات لحيواناتك الأليفة ذات الريش'
  },
  {
    id: 'fish',
    name: 'Fish',
    nameAr: 'الأسماك',
    image: 'https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg',
    description: 'Everything for your aquatic pets',
    descriptionAr: 'كل شيء لحيواناتك الأليفة المائية'
  },
  {
    id: 'small-pets',
    name: 'Small Pets',
    nameAr: 'الحيوانات الصغيرة',
    image: 'https://images.pexels.com/photos/4054781/pexels-photo-4054781.jpeg',
    description: 'Products for hamsters, guinea pigs, and more',
    descriptionAr: 'منتجات للهامستر وخنازير غينيا والمزيد'
  }
];