// apps/web/middleware.ts (or .js)
import { authkitMiddleware } from '@workos-inc/authkit-nextjs';

export default authkitMiddleware({
  middlewareAuth: {
    enabled: true,
    unauthenticatedPaths: ['/', '/signin', '/signup', '/api/webhook/auth', "/api/v1/generate"], // add any public routes
  },
});

// Run on all paths except Next internals & static assets
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images|public).*)',
  ],
};
