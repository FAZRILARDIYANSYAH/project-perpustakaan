"use client";
import { useEffect, useState } from "react";
import { BookOpen, Clock, CheckCircle, Calendar, User, TrendingUp } from "lucide-react";

export default function AdminPeminjamanPage() {
  // ------ semua hook harus di paling atas ------
  const [user, setUser] = useState(null);
  const [peminjamanList, setPeminjamanList] = useState([]);
  const [stats, setStats] = useState({
    diproses: 0,
    dipinjam: 0,
    selesai: 0,
  });
  const [loading, setLoading] = useState(true);

  // ------ load user (localStorage) ------
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) setUser(JSON.parse(data));
  }, []);

  // ------ load data peminjaman (API) ------
  useEffect(() => {
    fetch("/api/peminjaman")
      .then((res) => res.json())
      .then((data) => {
        setPeminjamanList(data);
        hitungStatistik(data);
      })
      .catch((err) => console.error("Gagal memuat data:", err))
      .finally(() => setLoading(false));
  }, []);

  const hitungStatistik = (data) => {
    const diproses = data.filter((i) => i.status === "Diproses").length;
    const dipinjam = data.filter((i) => i.status === "Dipinjam").length;
    const selesai = data.filter((i) => i.status === "Selesai").length;
    setStats({ diproses, dipinjam, selesai });
  };

  // ------ setelah semua hook, baru conditional return ------
  if (!user) return null;

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-10 bg-white rounded-3xl shadow-lg border border-red-200">
          <h1 className="text-5xl font-bold text-red-600 mb-4">403</h1>
          <p className="text-gray-600 text-lg font-medium">
            Akses ditolak. Halaman ini hanya untuk Admin.
          </p>
        </div>
      </div>
    );
  }

  // ------------------- lanjut render jika admin -------------------


  const getStatusColor = (status) => {
    switch (status) {
      case "Dipinjam":
        return "bg-blue-600 text-white";
      case "Diproses":
        return "bg-amber-500 text-white";
      case "Selesai":
        return "bg-green-600 text-white";
      case "Ditolak":
        return "bg-red-600 text-white";
      case "Menunggu Pengembalian":
        return "bg-purple-600 text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
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
        {/* Header */}
        <div className="mb-8 bg-white p-8 rounded-3xl shadow-xl border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-600 mb-2">
                📚 Manajemen Peminjaman
              </h1>
              <p className="text-gray-600 text-lg">
                Lihat, setujui, atau tolak peminjaman buku oleh siswa
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-blue-600 p-4 rounded-2xl shadow-lg">
                <TrendingUp className="text-white" size={32} />
              </div>
            </div>
          </div>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="group bg-white p-6 rounded-3xl shadow-lg border border-blue-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-blue-600 p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="text-white" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Sedang Dipinjam</p>
                <p className="text-3xl font-bold text-blue-600">{stats.dipinjam}</p>
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
                <p className="text-3xl font-bold text-amber-600">{stats.diproses}</p>
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
                <p className="text-3xl font-bold text-green-600">{stats.selesai}</p>
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-600 rounded-full" style={{width: `${Math.min((stats.selesai / 10) * 100, 100)}%`}}></div>
            </div>
          </div>
        </div>

        {/* Daftar Peminjaman */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              📖 Daftar Peminjaman
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
              <p className="text-gray-400 text-sm mt-2">Peminjaman akan muncul di sini</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-50 border-b-2 border-blue-100">
                    <th className="p-4 text-left font-bold text-gray-700">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-blue-600" />
                        Nama Siswa
                      </div>
                    </th>
                    <th className="p-4 text-left font-bold text-gray-700">
                      <div className="flex items-center gap-2">
                        <BookOpen size={16} className="text-blue-600" />
                        Judul Buku
                      </div>
                    </th>
                    <th className="p-4 text-left font-bold text-gray-700">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-blue-600" />
                        Tanggal Pinjam
                      </div>
                    </th>
                    <th className="p-4 text-left font-bold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {peminjamanList.map((item, index) => (
                    <tr 
                      key={item.id_pinjam} 
                      className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                    >
                      <td className="p-4">
                        <span className="font-medium text-gray-800">{item.namaSiswa}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-gray-700">{item.judulBuku}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-gray-600">{formatDate(item.tgl_pinjam)}</span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`text-xs font-bold px-4 py-2 rounded-xl shadow-md ${getStatusColor(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}