import { redirect } from 'next/navigation';

export default function Home() {
  // Default redirect to English version
  redirect('/en');
  
  // This page will never render, but we include it for completeness
  return null;
}