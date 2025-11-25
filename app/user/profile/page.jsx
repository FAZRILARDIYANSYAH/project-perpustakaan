"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, BadgeCheck, LogOut, Pencil, Shield, BookOpen, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ diproses: 0, dipinjam: 0, selesai: 0, ditolak: 0, menunggu: 0 });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const data = localStorage.getItem("user");

    if (!token || !data) {
      router.push("/");
      return;
    }

    const userData = JSON.parse(data);
    setUser(userData);
    fetchPeminjamanStats(userData.id || userData.id_user);
  }, [router]);

  const fetchPeminjamanStats = async (userId) => {
    try {
      const res = await fetch(`/api/peminjaman?user=${userId}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Gagal memuat data peminjaman");

      const data = await res.json();
      const peminjamanList = Array.isArray(data) ? data : [];

      const diproses = peminjamanList.filter((i) => i.status === "Diproses").length;
      const dipinjam = peminjamanList.filter((i) => i.status === "Dipinjam").length;
      const selesai = peminjamanList.filter((i) => i.status === "Selesai").length;
      const ditolak = peminjamanList.filter((i) => i.status === "Ditolak").length;
      const menunggu = peminjamanList.filter((i) => i.status === "Menunggu Pengembalian").length;

      setStats({ diproses, dipinjam, selesai, ditolak, menunggu });
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Memuat profil...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 py-10">
      {/* WRAPPER */}
      <div className="max-w-6xl mx-auto">
        {/* CARD PROFILE MAIN */}
        <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-8 md:p-10 mb-8">
          {/* SECTION: Identitas */}
          <div className="flex flex-col md:flex-row items-center gap-6 pb-8 border-b border-gray-200">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-xl">
              <User size={50} className="text-white" />
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{user.nama}</h2>
              <p className="text-gray-600 flex items-center gap-2 justify-center md:justify-start mb-2">
                <Mail size={18} className="text-blue-600" /> 
                {user.email}
              </p>
              <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
                <BadgeCheck size={18} className="text-blue-600" />
                <span className="text-sm font-bold text-blue-600 capitalize">{user.role}</span>
              </div>
            </div>
          </div>

          {/* STATISTICS SECTION */}
          <div className="mt-8 pb-8 border-b border-gray-200">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                📊 Statistik Peminjaman
              </h3>
              <p className="text-gray-600 text-sm mt-1">Ringkasan aktivitas peminjaman buku Anda</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Sedang Dipinjam */}
              <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-2xl shadow-md border border-blue-200 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-600 p-2.5 rounded-xl shadow-md mb-3 group-hover:scale-110 transition-transform">
                    <BookOpen className="text-white" size={24} />
                  </div>
                  <p className="text-3xl font-extrabold text-blue-600 mb-1">
                    {stats.dipinjam}
                  </p>
                  <p className="text-gray-700 font-semibold text-xs">
                    Sedang Dipinjam
                  </p>
                </div>
              </div>

              {/* Dalam Proses */}
              <div className="group bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-2xl shadow-md border border-amber-200 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-amber-500 p-2.5 rounded-xl shadow-md mb-3 group-hover:scale-110 transition-transform">
                    <Clock className="text-white" size={24} />
                  </div>
                  <p className="text-3xl font-extrabold text-amber-600 mb-1">
                    {stats.diproses}
                  </p>
                  <p className="text-gray-700 font-semibold text-xs">
                    Dalam Proses
                  </p>
                </div>
              </div>

              {/* Menunggu Pengembalian */}
              <div className="group bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-2xl shadow-md border border-purple-200 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-purple-600 p-2.5 rounded-xl shadow-md mb-3 group-hover:scale-110 transition-transform">
                    <AlertCircle className="text-white" size={24} />
                  </div>
                  <p className="text-3xl font-extrabold text-purple-600 mb-1">
                    {stats.menunggu}
                  </p>
                  <p className="text-gray-700 font-semibold text-xs">
                    Menunggu Kembali
                  </p>
                </div>
              </div>

              {/* Selesai */}
              <div className="group bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-2xl shadow-md border border-green-200 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-600 p-2.5 rounded-xl shadow-md mb-3 group-hover:scale-110 transition-transform">
                    <CheckCircle className="text-white" size={24} />
                  </div>
                  <p className="text-3xl font-extrabold text-green-600 mb-1">
                    {stats.selesai}
                  </p>
                  <p className="text-gray-700 font-semibold text-xs">
                    Selesai
                  </p>
                </div>
              </div>

              {/* Ditolak */}
              <div className="group bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-2xl shadow-md border border-red-200 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-red-600 p-2.5 rounded-xl shadow-md mb-3 group-hover:scale-110 transition-transform">
                    <XCircle className="text-white" size={24} />
                  </div>
                  <p className="text-3xl font-extrabold text-red-600 mb-1">
                    {stats.ditolak}
                  </p>
                  <p className="text-gray-700 font-semibold text-xs">
                    Ditolak
                  </p>
                </div>
              </div>
            </div>

            {/* Total Summary */}
            <div className="mt-6 p-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between text-white">
                <div>
                  <p className="text-sm font-medium opacity-90">Total Peminjaman</p>
                  <p className="text-2xl font-extrabold mt-1">
                    {stats.dipinjam + stats.diproses + stats.selesai + stats.ditolak + stats.menunggu}
                  </p>
                </div>
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                  <BookOpen size={28} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}