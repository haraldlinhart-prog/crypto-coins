import { NextRequest, NextResponse } from 'next/server';
export function middleware(req: NextRequest) {
  const url = new URL(req.url);
  if (url.pathname.length > 1 && url.pathname.endsWith('/') && !url.pathname.startsWith('/blog/')) {
    url.pathname = url.pathname.replace(/\/+$/, '') || '/';
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}
export const config = { matcher: ['/((?!api|_next|.*\..*).*)'] };
