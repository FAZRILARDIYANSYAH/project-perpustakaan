import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      );
    }

    const user = rows[0];

    const cocok = await bcrypt.compare(password, user.password);
    if (!cocok) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user.id, role: user.  role },
      process.env.JWT_SECRET || "SUPER_SECRET",
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
      message: "Login berhasil",
      token,                    // ⬅ WAJIB! untuk frontend
      user: {
        id: user.id,
        nama: user.nama,
        kelas: user.kelas,
        email: user.email,
        role: user.role,
      },
    });

    // Simpan token di cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("ERROR LOGIN:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
