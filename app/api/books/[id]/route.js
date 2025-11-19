import { db } from "@/lib/db";

export async function GET(req, context) {
  try {
    const { id } = await context.params;

    const [rows] = await db.query("SELECT * FROM buku WHERE id_buku = ?", [id]);

    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: "Buku tidak ditemukan" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(rows[0]), {
      status: 200,
    });
  } catch (error) {
    console.error("❌ Error detail buku:", error);
    return new Response(JSON.stringify({ error: "Kesalahan server" }), {
      status: 500,
    });
  }
}

export async function PUT(req, context) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const { judul, penulis, penerbit, tahun, stok, kategori } = body;

    await db.query(
      `UPDATE buku SET judul=?, penulis=?, penerbit=?, tahun=?, stok=?, kategori=?
       WHERE id_buku=?`,
      [judul, penulis, penerbit, tahun, stok, kategori, id]
    );

    return new Response(JSON.stringify({ message: "Buku berhasil diperbarui!" }));
  } catch (error) {
    console.error("❌ PUT Buku Error:", error);
    return new Response(JSON.stringify({ error: "Gagal memperbarui buku" }), {
      status: 500,
    });
  }
}

export async function DELETE(req, context) {
  try {
    const { id } = await context.params;

    await db.query("DELETE FROM buku WHERE id_buku=?", [id]);

    return new Response(JSON.stringify({ message: "Buku berhasil dihapus!" }));
  } catch (error) {
    console.error("❌ DELETE Buku Error:", error);
    return new Response(JSON.stringify({ error: "Gagal menghapus buku" }), {
      status: 500,
    });
  }
}
