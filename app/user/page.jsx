"use client";
import { useEffect, useState } from "react";
import { BookOpen, Clock, CheckCircle, Calendar, TrendingUp, ArrowRight } from "lucide-react";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [peminjamanList, setPeminjamanList] = useState([]);
  const [stats, setStats] = useState({ diproses: 0, dipinjam: 0, selesai: 0 });
  const [loading, setLoading] = useState(true);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  useEffect(() => {
    if (!user) return;
    fetchPeminjaman(user.id || user.id_user);
  }, [user]);

  const fetchPeminjaman = async (userId) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/peminjaman?user=${userId}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Gagal memuat data peminjaman");

      const data = await res.json();
      setPeminjamanList(Array.isArray(data) ? data : []);

      const diproses = data.filter((i) => i.status === "Diproses").length;
      const dipinjam = data.filter((i) => i.status === "Dipinjam").length;
      const selesai = data.filter((i) => i.status === "Selesai").length;

      setStats({ diproses, dipinjam, selesai });
    } catch (err) {
      console.error(err);
      alert("Gagal memuat data peminjaman");
    } finally {
      setLoading(false);
    }
  };

  const handleKembalikan = async (id_pinjam) => {
    try {
      const res = await fetch(`/api/peminjaman/${id_pinjam}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Menunggu Pengembalian" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert("Pengajuan pengembalian berhasil dikirim!");
      fetchPeminjaman(user.id || user.id_user);
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim pengajuan pengembalian");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Dipinjam": return "bg-blue-600 text-white";
      case "Diproses": return "bg-amber-500 text-white";
      case "Selesai": return "bg-green-600 text-white";
      case "Ditolak": return "bg-red-600 text-white";
      case "Menunggu Pengembalian": return "bg-purple-600 text-white";
      default: return "bg-gray-200 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 bg-white p-8 rounded-3xl shadow-xl border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-600 mb-2">
                Halo, {user?.nama}! 👋
              </h1>
              <p className="text-gray-600 text-lg">Selamat datang kembali di LearnSphere</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-blue-600 p-4 rounded-2xl shadow-lg">
                <TrendingUp className="text-white" size={32} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="group bg-white p-6 rounded-3xl shadow-lg border border-blue-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-blue-600 p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="text-white" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Sedang Dipinjam</p>
                <p className="text-3xl font-bold text-blue-600">
                  {stats.dipinjam}
                </p>
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{width: `${Math.min((stats.dipinjam / 10) * 100, 100)}%`}}></div>
            </div>
          </div>

          <div className="group bg-white p-6 rounded-3xl shadow-lg border border-blue-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-amber-500 p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Clock className="text-white" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Dalam Proses</p>
                <p className="text-3xl font-bold text-amber-600">
                  {stats.diproses}
                </p>
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{width: `${Math.min((stats.diproses / 10) * 100, 100)}%`}}></div>
            </div>
          </div>

          <div className="group bg-white p-6 rounded-3xl shadow-lg border border-blue-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-green-600 p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="text-white" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Selesai</p>
                <p className="text-3xl font-bold text-green-600">
                  {stats.selesai}
                </p>
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-600 rounded-full" style={{width: `${Math.min((stats.selesai / 10) * 100, 100)}%`}}></div>
            </div>
          </div>
        </div>

        {/* Peminjaman List */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              📚 Daftar Peminjaman
            </h2>
            <span className="text-sm text-gray-500 bg-blue-50 px-4 py-2 rounded-full font-medium">
              {peminjamanList.length} Total
            </span>
          </div>

          {peminjamanList.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-blue-400" size={40} />
              </div>
              <p className="text-gray-500 text-lg font-medium">Belum ada data peminjaman</p>
              <p className="text-gray-400 text-sm mt-2">Mulai pinjam buku untuk melihat riwayat di sini</p>
            </div>
          ) : (
            <div className="space-y-4">
              {peminjamanList.map((item, index) => (
                <div
                  key={item.id_pinjam || index}
                  className="group flex flex-col md:flex-row justify-between items-start md:items-center p-5 bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex-1 mb-3 md:mb-0">
                    <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                      {item.judulBuku || "-"}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={16} className="text-blue-400" />
                      <span className="font-medium">{formatDate(item.tgl_pinjam)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`text-xs font-bold px-4 py-2 rounded-xl shadow-md ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>

                    {item.status === "Dipinjam" && (
                      <button
                        onClick={() => handleKembalikan(item.id_pinjam)}
                        className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                      >
                        Kembalikan
                        <ArrowRight size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}