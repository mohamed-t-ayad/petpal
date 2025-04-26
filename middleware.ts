import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 
// Supported languages
const supportedLangs = ['en', 'ar'];
 
// Get the preferred language based on accept-language header and available languages
function getPreferredLang(request: NextRequest) {
  const acceptLang = request.headers.get('accept-language')?.split(',')[0]?.split('-')[0] || 'en';
  return supportedLangs.includes(acceptLang) ? acceptLang : 'en';
}
 
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for API routes, static files, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }
  
  // Check if the path already has a locale
  const pathnameHasLang = supportedLangs.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );
  
  if (pathnameHasLang) return NextResponse.next();
  
  // If no locale detected, redirect to the preferred locale version
  const preferredLang = getPreferredLang(request);
  
  // Clone the URL and set the preferred language
  const newUrl = request.nextUrl.clone();
  
  // Handle the root path
  if (pathname === '/') {
    newUrl.pathname = `/${preferredLang}`;
    return NextResponse.redirect(newUrl);
  }
  
  // Handle other paths
  newUrl.pathname = `/${preferredLang}${pathname}`;
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, images, etc.)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}