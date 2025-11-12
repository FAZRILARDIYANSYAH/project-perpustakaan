import { db } from "@/lib/db";

export async function GET() {
  try {
    // 🔹 Ambil semua buku dari tabel
    const [rows] = await db.query("SELECT * FROM buku");

    // 🔹 Pastikan data ada
    if (!rows || rows.length === 0) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 🔹 Bentuk ulang data agar sesuai dengan frontend
    const books = rows.map((b) => ({
      id_buku: b.id_buku,
      judul: b.judul,
      penulis: b.penulis,
      penerbit: b.penerbit,
      tahun: b.tahun,
      stok: b.stok,
      coverImage: `/${b.judul.toLowerCase().replace(/ /g, "-")}.jpg`, // otomatis nyambung ke /public
    }));

    // 🔹 Kirim hasilnya
    return new Response(JSON.stringify(books), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ DB ERROR:", error);
    return new Response(
      JSON.stringify({ error: "Gagal mengambil data buku", detail: String(error) }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
