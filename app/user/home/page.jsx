"use client";
import { useEffect, useState } from "react";
import { BookOpen, Clock, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [peminjamanList, setPeminjamanList] = useState([]);
  const [stats, setStats] = useState({
    diproses: 0,
    dipinjam: 0,
    selesai: 0,
  });
  const [loading, setLoading] = useState(true);

  // Ambil user dari localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Fetch data peminjaman
  useEffect(() => {
    if (!user) return;
    fetchPeminjaman(user.id || user.id_user);
  }, [user]);

  // Fetch API peminjaman
  const fetchPeminjaman = async (userId) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/peminjaman?user=${userId}`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Gagal memuat data peminjaman");

      const data = await res.json();
      setPeminjamanList(Array.isArray(data) ? data : []);

      const diproses = data.filter((i) => i.status === "Diproses").length;
      const dipinjam = data.filter((i) => i.status === "Dipinjam").length;
      const selesai = data.filter((i) => i.status === "Selesai").length;

      setStats({ diproses, dipinjam, selesai });

    } catch (err) {
      console.error("❌ Error:", err);
      toast.error("Gagal memuat data peminjaman");
    } finally {
      setLoading(false);
    }
  };

  // Tombol Kembalikan
  const handleKembalikan = async (id_pinjam) => {
    try {
      const res = await fetch(`/api/peminjaman/${id_pinjam}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Menunggu Pengembalian" }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      toast.success("Pengajuan pengembalian berhasil dikirim!");

      // reload data
      fetchPeminjaman(user.id || user.id_user);

    } catch (err) {
      console.error(err);
      toast.error("Gagal mengirim pengajuan pengembalian");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Dipinjam":
        return "bg-blue-100 text-blue-700";
      case "Diproses":
        return "bg-yellow-100 text-yellow-700";
      case "Selesai":
        return "bg-green-100 text-green-700";
      case "Ditolak":
        return "bg-red-100 text-red-700";
      case "Menunggu Pengembalian":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading)
    return (
      <div className="p-8 text-center text-gray-500">
        ⏳ Memuat data peminjaman...
      </div>
    );

  return (
    <div className="p-8">
      {/* Greeting */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        👋 Halo, <span className="text-blue-600">{user?.nama || "Pengguna"}</span>!
      </h1>
      <p className="text-gray-500 mb-6">
        Selamat datang kembali di LearnSphere — berikut ringkasan aktivitasmu.
      </p>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="flex items-center gap-3 bg-blue-50 p-5 rounded-2xl shadow-sm border border-blue-100">
          <BookOpen className="text-blue-600" size={28} />
          <div>
            <p className="text-sm text-gray-500">Sedang Dipinjam</p>
            <p className="text-2xl font-bold text-blue-700">{stats.dipinjam}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-yellow-50 p-5 rounded-2xl shadow-sm border border-yellow-100">
          <Clock className="text-yellow-600" size={28} />
          <div>
            <p className="text-sm text-gray-500">Dalam Proses</p>
            <p className="text-2xl font-bold text-yellow-700">{stats.diproses}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-green-50 p-5 rounded-2xl shadow-sm border border-green-100">
          <CheckCircle className="text-green-600" size={28} />
          <div>
            <p className="text-sm text-gray-500">Selesai</p>
            <p className="text-2xl font-bold text-green-700">{stats.selesai}</p>
          </div>
        </div>
      </div>

      {/* Daftar Peminjaman */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Daftar Peminjaman 📚
        </h2>

        {peminjamanList.length === 0 ? (
          <p className="text-gray-500 text-sm">Belum ada data peminjaman.</p>
        ) : (
          <ul className="space-y-3">
            {peminjamanList.map((item, index) => (
              <li
                key={item.id_pinjam || index}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                <span className="font-medium text-gray-700">
                  {item.judulBuku || "-"}
                </span>

                <div className="flex items-center gap-3">
                  {/* STATUS */}
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>

                  {/* Tombol Kembalikan */}
                  {item.status === "Dipinjam" && (
                    <button
                      onClick={() => handleKembalikan(item.id_pinjam)}
                      className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md"
                    >
                      Kembalikan
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
