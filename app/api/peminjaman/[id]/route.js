import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(req, context) {
  const connection = db;

  try {
    const params = await context.params; // FIX WAJIB
    const { id } = params;

    const body = await req.json();
    const status = body?.status;

    console.log("📥 PARAM ID:", id);
    console.log("📥 BODY:", body);

    if (!id || !status) {
      console.log("❌ VALIDATION FAILED — id:", id, "status:", status);
      return NextResponse.json(
        { error: "ID atau status tidak valid" },
        { status: 400 }
      );
    }

    // Ambil id_buku dari tabel peminjaman
    const [rows] = await connection.query(
      "SELECT id_buku FROM peminjaman WHERE id_pinjam = ?",
      [id]
    );

    if (!rows?.length) {
      return NextResponse.json(
        { error: "Peminjaman tidak ditemukan" },
        { status: 404 }
      );
    }

    const id_buku = rows[0].id_buku;

    await connection.query("START TRANSACTION");

    await connection.query(
      "UPDATE peminjaman SET status = ? WHERE id_pinjam = ?",
      [status, id]
    );

    if (status === "Dipinjam") {
      await connection.query(
        "UPDATE buku SET stok = stok - 1 WHERE id_buku = ?",
        [id_buku]
      );
    }

    if (status === "Selesai") {
      await connection.query(
        "UPDATE buku SET stok = stok + 1 WHERE id_buku = ?",
        [id_buku]
      );
      await connection.query(
        "UPDATE peminjaman SET tgl_kembali = CURDATE() WHERE id_pinjam = ?",
        [id]
      );
    }

    await connection.query("COMMIT");

    return NextResponse.json({
      message: `Status peminjaman #${id} berhasil diperbarui menjadi '${status}'`,
    });
  } catch (err) {
    console.error("🔥 PATCH ERROR:", err);
    await connection.query("ROLLBACK");

    return NextResponse.json(
      { error: "Gagal memperbarui status", details: err.message },
      { status: 500 }
    );
  }
}
