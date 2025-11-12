import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { nama, kelas, email, password } = await req.json();

    // ✅ Cek apakah email sudah dipakai
    const [cek] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (cek.length > 0) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    // ✅ Hash password
    const hashed = await bcrypt.hash(password, 10);

    // ✅ role langsung 'siswa'
    const role = "siswa";

    const insert = await db.query(
      "INSERT INTO users (nama, kelas, email, password, role) VALUES (?, ?, ?, ?, ?)",
      [nama, kelas, email, hashed, role]
    );

    const userId = insert[0].insertId;

    const token = jwt.sign({ id: userId, role }, "SUPER_SECRET", {
      expiresIn: "1d",
    });

    return NextResponse.json({
      message: "Registrasi berhasil",
      token,
      user: {
        id: userId,
        nama,
        kelas,
        email,
        role,
      },
    });
  } catch (err) {
    console.error("ERROR REGISTER:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
