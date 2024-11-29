import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { verifyUser } from "./app/lib/dal";

export async function middleware(req: NextRequest) {
  const isverified = await verifyUser();
  const publicRoutes = ["/login", "/signup"];
  const {
    nextUrl: { pathname },
  } = req;

  if (!isverified.isAuth && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
