import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const host = request.headers.get('host') ?? '';

  // Redirect http → https and www → non-www
  const isHttp = url.protocol === 'http:';
  const isWww = host.startsWith('www.');

  if (isHttp || isWww) {
    const canonical = new URL(request.url);
    canonical.protocol = 'https:';
    canonical.host = host.replace(/^www\./, '');
    return NextResponse.redirect(canonical, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run on all routes except Next.js internals and static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
