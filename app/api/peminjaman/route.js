import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// 🔹 GET: Ambil data peminjaman
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("user");

    let query;
    let params = [];

    if (userId) {
      query = `
        SELECT 
          p.id_pinjam,
          b.judul AS judulBuku,
          p.tgl_pinjam,
          p.status
        FROM peminjaman p
        JOIN buku b ON p.id_buku = b.id_buku
        WHERE p.id_user = ?
        ORDER BY p.id_pinjam DESC
      `;
      params = [userId];
    } else {
      query = `
        SELECT 
          p.id_pinjam,
          u.nama AS namaSiswa,
          b.judul AS judulBuku,
          p.tgl_pinjam,
          p.status
        FROM peminjaman p
        JOIN users u ON p.id_user = u.id
        JOIN buku b ON p.id_buku = b.id_buku
        ORDER BY p.id_pinjam DESC
      `;
    }

    const [rows] = await db.query(query, params);
    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    console.error("❌ Error GET /api/peminjaman:", err.message);
    return NextResponse.json(
      { error: "Gagal mengambil data peminjaman", details: err.message },
      { status: 500 }
    );
  }
}

// 🔹 POST: Tambah data peminjaman (ini yang bikin error kamu)
export async function POST(req) {
  try {
    const body = await req.json();
    const { id_user, id_buku, tgl_pinjam, tgl_kembali } = body;

    if (!id_user || !id_buku || !tgl_pinjam || !tgl_kembali) {
      return NextResponse.json(
        { error: "Data peminjaman tidak lengkap" },
        { status: 400 }
      );
    }

    await db.query(
      `INSERT INTO peminjaman (id_user, id_buku, tgl_pinjam, tgl_kembali, status)
       VALUES (?, ?, ?, ?, 'Diproses')`,
      [id_user, id_buku, tgl_pinjam, tgl_kembali]
    );

    // ✅ HARUS selalu return JSON agar tidak error di frontend
    return NextResponse.json({
      message: "Permintaan peminjaman berhasil dikirim ✅",
    });
  } catch (err) {
    console.error("❌ Error POST /api/peminjaman:", err.message);
    return NextResponse.json(
      { error: "Gagal mengirim permintaan peminjaman", details: err.message },
      { status: 500 }
    );
  }
}
