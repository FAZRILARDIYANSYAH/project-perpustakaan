import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM buku");

    const books = rows.map((book) => {
      let coverImage = "/placeholder-book.png";

      if (book.cover) {
        if (book.cover.startsWith("http")) {
          // jika URL dari Google
          coverImage = book.cover;
        } else {
          // jika file lokal di public/cover
          coverImage = `/cover/${book.cover}`;
        }
      }

      return {
        id_buku: book.id_buku,
        judul: book.judul,
        penulis: book.penulis,
        penerbit: book.penerbit,
        tahun: book.tahun,
        stok: book.stok,
        kategori: book.kategori,
        coverImage,
        cover: book.cover, // tetap simpan mentahan untuk kelola buku
      };
    });

    return new Response(JSON.stringify(books), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Gagal mengambil data buku" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { judul, penulis, penerbit, tahun, stok, kategori, cover } = body;

    await db.query(
      `INSERT INTO buku (judul, penulis, penerbit, tahun, stok, kategori, cover)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [judul, penulis, penerbit, tahun, stok, kategori, cover]
    );

    return new Response(JSON.stringify({ message: "Buku berhasil ditambahkan!" }), {
      status: 201,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Gagal menambah buku" }), {
      status: 500,
    });
  }
}
