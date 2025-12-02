import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({
    message: "Logout berhasil",
  });

  // Hapus cookie token (sesuai cara kamu menyimpan cookie login)
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),  // ⬅ tanggal kadaluarsa
    path: "/",
  });

  return response;
}
