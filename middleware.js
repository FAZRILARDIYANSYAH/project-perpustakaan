import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token");
  const path = req.nextUrl.pathname;

  const isLoginPage = path.startsWith("/auth");

  // Halaman yang butuh login
  const isProtected =
    path.startsWith("/user") ||
    path.startsWith("/admin");

  // Jika halaman protected tapi tidak ada token → PAKSA ke login
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Jika SUDAH login tapi buka halaman /auth → pindah ke home
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // if (path.startsWith('/admin') && token.role !== 'admin') {
  //   return NextResponse.redirect(new URL("/auth/login", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user/:path*",
    "/admin/:path*",
   
  ],
};








