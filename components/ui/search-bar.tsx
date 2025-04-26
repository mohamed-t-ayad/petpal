'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/language-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onClose?: () => void;
}

export default function SearchBar({ onClose }: SearchBarProps) {
  const { t, lang } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${lang}/search?q=${encodeURIComponent(query)}`);
      if (onClose) onClose();
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center">
      <Input
        type="search"
        placeholder={t.search_placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full"
      />
      <Button type="submit" size="icon" className="absolute right-0 rtl:left-0 rtl:right-auto">
        <Search className="h-4 w-4" />
      </Button>
      {onClose && (
        <Button type="button" variant="ghost" size="icon" className="absolute -right-10 rtl:-left-10 rtl:right-auto" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      )}
    </form>
  );
}