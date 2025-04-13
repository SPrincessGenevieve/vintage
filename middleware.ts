import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the path matches /dashboard or any sub-path
  if (pathname.startsWith('/dashboard')) {
    const token = req.cookies.get('token'); // Adjust according to your auth mechanism

    // If no token is present, redirect to sign-in page
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/auth/sign-in';
      return NextResponse.redirect(url);
    }
  }

  // Proceed as usual for other routes
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // Protect /dashboard and sub-paths
};
