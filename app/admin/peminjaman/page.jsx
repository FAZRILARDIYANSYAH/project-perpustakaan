"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function AdminPeminjamanPage() {
  const [peminjamanList, setPeminjamanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  // Ambil data peminjaman
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

  // Update status
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

  // Warna status
  const getStatusColor = (status) => {
    switch (status) {
      case "Diproses":
        return "bg-yellow-100 text-yellow-700";
      case "Dipinjam":
        return "bg-blue-100 text-blue-700";
      case "Ditolak":
        return "bg-red-100 text-red-700";
      case "Selesai":
        return "bg-green-100 text-green-700";
      case "Menunggu Pengembalian":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-10">
        📘 Konfirmasi Peminjaman
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-600">Memuat data peminjaman...</p>
        ) : peminjamanList.length === 0 ? (
          <p className="text-center text-gray-600">
            Belum ada peminjaman yang masuk.
          </p>
        ) : (
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="py-3 px-4 rounded-tl-lg">Nama Siswa</th>
                <th className="py-3 px-4">Judul Buku</th>
                <th className="py-3 px-4">Tanggal Pinjam</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 rounded-tr-lg text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {peminjamanList.map((item) => (
                <tr
                  key={item.id_pinjam}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {item.namaSiswa}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {item.judulBuku}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {item.tgl_pinjam}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center">
                    {/* Status "Diproses" → Setujui / Tolak */}
                    {item.status === "Diproses" && (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            handleUpdateStatus(item.id_pinjam, "Dipinjam")
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm"
                        >
                          Setujui
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateStatus(item.id_pinjam, "Ditolak")
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm"
                        >
                          Tolak
                        </button>
                      </div>
                    )}

                    {/* Status "Menunggu Pengembalian" */}
                    {item.status === "Menunggu Pengembalian" && (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            handleUpdateStatus(item.id_pinjam, "Selesai")
                          }
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md text-sm"
                        >
                          Selesai
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateStatus(item.id_pinjam, "Dipinjam")
                          }
                          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded-md text-sm"
                        >
                          Batalkan
                        </button>
                      </div>
                    )}

                    {/* Status lain → tidak ada aksi */}
                    {item.status !== "Diproses" &&
                      item.status !== "Menunggu Pengembalian" && (
                        <span className="text-gray-400 text-sm">
                          Tidak ada aksi
                        </span>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
