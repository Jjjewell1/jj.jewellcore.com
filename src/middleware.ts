import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin/login")) return NextResponse.next();
  if (pathname.startsWith("/admin")) {
    const auth = req.cookies.get("admin_auth")?.value;
    if (auth !== "1") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
