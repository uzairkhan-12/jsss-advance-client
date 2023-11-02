/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

function getUserStatus(token: any) {
  if (token.user.role === 'user') {
    return 'user';
  } else if (token.user.role === 'admin') {
    return 'admin';
  }
  return 'guest';
}

function getRequiredStatus(pathname: any) {
  if (pathname.startsWith('/dashboard/admin')) {
    return 'admin';
  } else if (pathname.startsWith('/dashboard/user')) {
    return 'user';
  }
  return 'guest';
}

export default function middleware(req: any) {
  const cookieString = req.cookies;
  const cookies = cookieString.toString().split(';');
  let token = null;
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie
      .split('=')
      .map((s: any) => s.trim());
    if (cookieName === 'token') {
      try {
        token = JSON.parse(decodeURIComponent(cookieValue));
      } catch (error) {
        console.error('Error parsing token:', error);
      }
      break;
    }
  }

  if (token) {
    const userStatus = getUserStatus(token);
    const requiredStatus = getRequiredStatus(req.nextUrl.pathname);

    if (requiredStatus === 'guest' && userStatus) {
      if (userStatus === 'admin') {
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_CLIENT_PATH}/dashboard/${userStatus}/settings`,
        );
      }
      if (userStatus === 'user') {
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_CLIENT_PATH}/dashboard/${userStatus}/data`,
        );
      }
    } else if (userStatus !== requiredStatus) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_CLIENT_PATH}/404`,
      );
    }
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/register', '/'],
};
