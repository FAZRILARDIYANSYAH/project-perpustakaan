import { db } from "@/lib/db";

export async function GET(request, context) {
  try {
    // ✅ params sekarang adalah Promise, jadi harus di-await
    const { id } = await context.params;

    if (!id) {
      return new Response(JSON.stringify({ message: "ID tidak diberikan" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const [rows] = await db.query("SELECT * FROM buku WHERE id_buku = ?", [id]);
    console.log("📚 Data hasil query:", rows);

    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: "Buku tidak ditemukan" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(rows[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error di API detail buku:", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
