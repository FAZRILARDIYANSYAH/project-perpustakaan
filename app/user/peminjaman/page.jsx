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

      router.push("/user");
    } catch (err) {
      console.error("❌ Error:", err);
      toast.error(err.message, { id: loading });
    }
  };

  // 🔹 Loading
  if (!user || !book)
    return (
      <main className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
          <p className="text-gray-600 font-medium">Memuat data peminjaman...</p>
        </div>
      </main>
    );

  // 🔹 UI Form
  return (
    <main className="h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Formulir Peminjaman Buku
          </h1>
          <p className="text-gray-600">Lengkapi data untuk meminjam buku pilihan Anda</p>
        </div>

        <div className="bg-white shadow-2xl rounded-3xl border border-gray-100 overflow-hidden">
          
          {/* Book Info Card */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <img
                  src={book.coverImage}
                  alt={book.judul}
                  className="w-16 h-20 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{book.judul}</h2>
                <div className="flex items-center gap-2 text-blue-100">
                  <p className="text-sm">{book.penulis}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 space-y-6">
            
            {/* Nama Peminjam */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Peminjam
              </label>
              <input
                type="text"
                value={user.nama}
                readOnly
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-600 font-medium focus:outline-none"
              />
            </div>

            {/* Tanggal Pinjam */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tanggal Pinjam
              </label>
              <input
                type="date"
                value={tanggalPinjam}
                onChange={(e) => setTanggalPinjam(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                required
              />
            </div>

            {/* Tanggal Kembali */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tanggal Kembali
              </label>
              <input
                type="date"
                value={tanggalKembali}
                onChange={(e) => setTanggalKembali(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                required
              />
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">💡</span>
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-1">Informasi Penting:</p>
                  <p>Pastikan mengembalikan buku tepat waktu untuk menghindari denda keterlambatan.</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <span className="text-xl">✅</span>
              Kirim Permintaan Peminjaman
            </button>

          </div>
        </div>
      </div>
    </main>
  );
}