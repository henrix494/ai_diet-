import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
const isDashboardRoute = createRouteMatcher(["/:locale/dashboard(.*)"]);
const isFavoriteRoute = createRouteMatcher(["/:locale/favorite(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const intlMiddleware = createMiddleware(routing);
  // Restrict admin route to users with specific role
  // Restrict dashboard routes to signed in users
  if (isDashboardRoute(req) || isFavoriteRoute(req)) await auth.protect();

  return intlMiddleware(req);
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|public|WhoAreWe|steps).*)", "/"],
};

//  req
