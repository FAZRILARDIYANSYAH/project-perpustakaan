"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, User, BookOpen, Calendar } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminPeminjamanPage() {
  const [peminjamanList, setPeminjamanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchPeminjaman = async () => {
      try {
        const res = await fetch("/api/peminjaman", { cache: "no-store" });
        if (!res.ok) throw new Error("Gagal memuat data peminjaman");
        const data = await res.json();
        setPeminjamanList(Array.isArray(data) ? data : []);
      } catch (err) {
        toast.error("Gagal memuat data peminjaman");
        console.error("Error fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPeminjaman();
  }, [refresh]);

  const handleUpdateStatus = async (id_pinjam, statusBaru) => {
    try {
      const res = await fetch(`/api/peminjaman/${id_pinjam}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: statusBaru }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal memperbarui status");

      toast.success(data.message || "Status berhasil diperbarui");
      setRefresh((prev) => !prev);
    } catch (err) {
      toast.error("Terjadi kesalahan saat update status");
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Diproses": return "bg-amber-500 text-white";
      case "Dipinjam": return "bg-blue-600 text-white";
      case "Ditolak": return "bg-red-600 text-white";
      case "Selesai": return "bg-green-600 text-white";
      case "Menunggu Pengembalian": return "bg-purple-600 text-white";
      default: return "bg-gray-200 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Memuat data peminjaman...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white p-8 rounded-3xl shadow-xl border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-600 mb-2">📘 Konfirmasi Peminjaman</h1>
              <p className="text-gray-600 text-lg">Kelola persetujuan peminjaman dan pengembalian buku</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-blue-600 p-4 rounded-2xl shadow-lg">
                <CheckCircle className="text-white" size={32} />
              </div>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Daftar Peminjaman</h2>
            <span className="text-sm text-gray-500 bg-blue-50 px-4 py-2 rounded-full font-medium">
              {peminjamanList.length} Total
            </span>
          </div>

          {peminjamanList.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-blue-400" size={40} />
              </div>
              <p className="text-gray-500 text-lg font-medium">Belum ada peminjaman yang masuk</p>
              <p className="text-gray-400 text-sm mt-2">Peminjaman akan muncul di sini</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="py-4 px-4 text-left rounded-tl-2xl">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        Nama Siswa
                      </div>
                    </th>
                    <th className="py-4 px-4 text-left">
                      <div className="flex items-center gap-2">
                        <BookOpen size={16} />
                        Judul Buku
                      </div>
                    </th>
                    <th className="py-4 px-4 text-left">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        Tanggal Pinjam
                      </div>
                    </th>
                    <th className="py-4 px-4 text-left">Status</th>
                    <th className="py-4 px-4 text-center rounded-tr-2xl">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {peminjamanList.map((item) => (
                    <tr
                      key={item.id_pinjam}
                      className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                    >
                      <td className="py-4 px-4 font-semibold text-gray-800">{item.namaSiswa}</td>
                      <td className="py-4 px-4 text-gray-700">{item.judulBuku}</td>
                      <td className="py-4 px-4 text-gray-600">{formatDate(item.tgl_pinjam)}</td>

                      <td className="py-4 px-4">
                        <span
                          className={`text-xs font-bold px-4 py-2 rounded-xl shadow-md ${getStatusColor(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        {item.status === "Diproses" && (
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleUpdateStatus(item.id_pinjam, "Dipinjam")}
                              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                            >
                              <CheckCircle size={16} />
                              Setujui
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(item.id_pinjam, "Ditolak")}
                              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                            >
                              <XCircle size={16} />
                              Tolak
                            </button>
                          </div>
                        )}

                        {item.status === "Menunggu Pengembalian" && (
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleUpdateStatus(item.id_pinjam, "Selesai")}
                              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                            >
                              <CheckCircle size={16} />
                              Selesai
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(item.id_pinjam, "Dipinjam")}
                              className="flex items-center gap-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                            >
                              <XCircle size={16} />
                              Batalkan
                            </button>
                          </div>
                        )}

                        {item.status !== "Diproses" &&
                          item.status !== "Menunggu Pengembalian" && (
                            <div className="flex justify-center">
                              <span className="text-gray-400 text-sm bg-gray-100 px-4 py-2 rounded-xl">
                                Tidak ada aksi
                              </span>
                            </div>
                          )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
