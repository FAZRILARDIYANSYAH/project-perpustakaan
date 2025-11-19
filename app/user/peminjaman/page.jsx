"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function PeminjamanPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [book, setBook] = useState(null);
  const [tanggalPinjam, setTanggalPinjam] = useState("");
  const [tanggalKembali, setTanggalKembali] = useState("");

  // Ambil data user & buku dari localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    const selectedBook = localStorage.getItem("selectedBook");

    if (!userData || !selectedBook) {
      toast.error("Data tidak ditemukan, kembali ke halaman utama.");
      router.push("/user/home");
      return;
    }

    setUser(JSON.parse(userData));
    setBook(JSON.parse(selectedBook));

    const today = new Date().toISOString().split("T")[0];
    const nextWeek = new Date();
    nextWeek.setDate(new Date().getDate() + 7);

    setTanggalPinjam(today);
    setTanggalKembali(nextWeek.toISOString().split("T")[0]);
  }, [router]);

  // Submit peminjaman ke backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !book) return;

    const loading = toast.loading("Mengirim permintaan peminjaman...");

    try {
      const res = await fetch("/api/peminjaman", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_user: user.id,
          id_buku: book.id_buku,
          tgl_pinjam: tanggalPinjam,
          tgl_kembali: tanggalKembali,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal meminjam buku");

      // Simpan ke localStorage
      const newLoan = {
        id_pinjam: Date.now(),
        judulBuku: book.judul,
        status: "Diproses",
        tgl_pinjam: tanggalPinjam,
        tgl_kembali: tanggalKembali,
      };

      const existingList =
        JSON.parse(localStorage.getItem("peminjamanList")) || [];
      localStorage.setItem(
        "peminjamanList",
        JSON.stringify([newLoan, ...existingList])
      );

      localStorage.removeItem("selectedBook");

      toast.success("Permintaan peminjaman berhasil dikirim!", {
        id: loading,
      });

      router.push("/user/home");
    } catch (err) {
      console.error("❌ Error:", err);
      toast.error(err.message, { id: loading });
    }
  };

  // 🔹 Loading
  if (!user || !book)
    return (
      <main className="h-screen flex justify-center items-center bg-white text-gray-600">
        Memuat data peminjaman...
      </main>
    );

  // 🔹 UI Form
  return (
    <main className="min-h-screen bg-white text-gray-800 py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Formulir Peminjaman Buku
        </h1>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
          <p>
            <span className="font-semibold">Judul Buku:</span> {book.judul}
          </p>
          <p>
            <span className="font-semibold">Penulis:</span> {book.penulis}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">
              Nama Peminjam
            </label>
            <input
              type="text"
              value={user.nama}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Tanggal Pinjam
            </label>
            <input
              type="date"
              value={tanggalPinjam}
              onChange={(e) => setTanggalPinjam(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Tanggal Kembali
            </label>
            <input
              type="date"
              value={tanggalKembali}
              onChange={(e) => setTanggalKembali(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium transition"
          >
            Kirim Permintaan Peminjaman
          </button>
        </form>
      </div>
    </main>
  );
}
