import { NextRequest, NextResponse } from 'next/server';
import csrf from 'edge-csrf';

import HttpStatusCode from '~/core/generic/http-status-code.enum';
import configuration from '~/configuration';
import createMiddlewareClient from '~/core/supabase/middleware-client';
import GlobalRole from '~/core/session/types/global-role';

const CSRF_SECRET_COOKIE = 'csrfSecret';
const NEXT_ACTION_HEADER = 'next-action';

export const config = {
  matcher: [
    // '/((?!_next/static|_next/image|favicon.ico|locales|assets|api/stripe/webhook).*)',
    '/((?!_next|favicon|logo|font).*)',
  ],
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  // const supabase = createMiddlewareClient(request, response);
  // const resp = await supabase.auth.getSession();
  // console.log('resp', resp);
  // await Logger.flush();
  // const csrfResponse = await withCsrfMiddleware(request, response);

  const sessionResponse = await sessionMiddleware(request, response);

  // return response;

  return await adminMiddleware(request, sessionResponse);
}

async function sessionMiddleware(req: NextRequest, res: NextResponse) {
  const supabase = createMiddlewareClient(req, res);

  const data = await supabase.auth.getSession();
  return res;
}

// async function withCsrfMiddleware(
//   request: NextRequest,
//   response = new NextResponse(),
// ) {
//   // set up CSRF protection
//   const csrfMiddleware = csrf({
//     cookie: {
//       secure: configuration.production,
//       name: CSRF_SECRET_COOKIE,
//     },
//     // ignore CSRF errors for server actions since protection is built-in
//     ignoreMethods: isServerAction(request)
//       ? ['POST']
//       : // always ignore GET, HEAD, and OPTIONS requests
//         ['GET', 'HEAD', 'OPTIONS'],
//   });

//   const csrfError = await csrfMiddleware(request, response);

//   // if there is a CSRF error, return a 403 response
//   if (csrfError) {
//     return NextResponse.json('Invalid CSRF token', {
//       status: HttpStatusCode.Forbidden,
//     });
//   }

//   // otherwise, return the response
//   return response;
// }

// function isServerAction(request: NextRequest) {
//   const headers = new Headers(request.headers);

//   return headers.has(NEXT_ACTION_HEADER);
// }

async function adminMiddleware(request: NextRequest, response: NextResponse) {
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');

  if (!isAdminPath) {
    return response;
  }

  const supabase = createMiddlewareClient(request, response);
  const { data, error } = await supabase.auth.getUser();
  const origin = request.nextUrl.origin;

  // If user is not logged in, redirect to sign in page.
  // This should never happen, but just in case.
  if (!data.user || error) {
    return NextResponse.redirect(`${origin}/auth/sign-in`);
  }

  const role = data.user?.app_metadata['role'];

  // If user is not an admin, redirect to 404 page.
  if (!role || role !== GlobalRole.SuperAdmin) {
    return NextResponse.redirect(`${origin}/404`);
  }

  // in all other cases, return the response
  return response;
}

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { verifyToken } from './lib/jwt/jwt';

// export function middleware(request: NextRequest) {
//   // List of public paths that don't require authentication
//   const publicPaths = ['/signin', '/signup', '/forgot-password'];

//   if (publicPaths.includes(request.nextUrl.pathname)) {
//     return NextResponse.next();
//   }

//   const token =
//     request.headers.get('Authorization')?.split(' ')[1] ||
//     request.cookies.get('authToken')?.value;

//   if (!token || !verifyToken(token)) {
//     return NextResponse.redirect(new URL('/auth/sign-in', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - public folder
//      */
//     '/((?!_next/static|_next/image|favicon.ico|public).*)',
//   ],
// };
