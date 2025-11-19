"use client";
import { useEffect, useState } from "react";
import { BookOpen, Clock, CheckCircle } from "lucide-react";

export default function AdminPeminjamanPage() {
  const [peminjamanList, setPeminjamanList] = useState([]);
  const [stats, setStats] = useState({
    diproses: 0,
    dipinjam: 0,
    selesai: 0,
  });

  useEffect(() => {
    fetch("/api/peminjaman")
      .then((res) => res.json())
      .then((data) => {
        setPeminjamanList(data);
        hitungStatistik(data);
      })
      .catch((err) => console.error("Gagal memuat data:", err));
  }, []);

  const hitungStatistik = (data) => {
    const diproses = data.filter((i) => i.status === "Diproses").length;
    const dipinjam = data.filter((i) => i.status === "Dipinjam").length;
    const selesai = data.filter((i) => i.status === "Selesai").length;
    setStats({ diproses, dipinjam, selesai });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Dipinjam":
        return "bg-blue-100 text-blue-700";
      case "Diproses":
        return "bg-yellow-100 text-yellow-700";
      case "Selesai":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        📚 Manajemen Peminjaman
      </h1>
      <p className="text-gray-500 mb-6">
        Lihat, setujui, atau tolak peminjaman buku oleh siswa.
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
          Daftar Peminjaman 📖
        </h2>

        {peminjamanList.length === 0 ? (
          <p className="text-gray-500 text-sm">Belum ada data peminjaman.</p>
        ) : (
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="p-3">Nama Siswa</th>
                <th className="p-3">Judul Buku</th>
                <th className="p-3">Tanggal Pinjam</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {peminjamanList.map((item) => (
                <tr key={item.id_pinjam} className="border-b hover:bg-gray-50">
                  <td className="p-3">{item.namaSiswa}</td>
                  <td className="p-3">{item.judulBuku}</td>
                  <td className="p-3">{item.tgl_pinjam}</td>
                  <td className="p-3">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
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
        )}
      </div>
    </div>
  );
}
