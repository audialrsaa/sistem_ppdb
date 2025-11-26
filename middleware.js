import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req });

  // Kalau belum login → lempar ke login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = token.user.role;
  const path = req.nextUrl.pathname;

  // ========= CEK ROLE UNTUK DASHBOARD ==========
  if (path.startsWith("/dashboard")) {
    // dashboard admin
    if (path.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // dashboard petugas
    if (path.startsWith("/petugas") && role !== "petugas_ppdb") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // dashboard calon siswa
    if (path.startsWith("/user") && role !== "calon_siswa") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], 
};
