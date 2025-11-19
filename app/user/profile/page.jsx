"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, BadgeCheck, LogOut, Pencil } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const data = localStorage.getItem("user");

    if (!token || !data) {
      router.push("/");
      return;
    }

    setUser(JSON.parse(data));
  }, [router]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600 text-lg">Memuat profil...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10">

      {/* WRAPPER */}
      <div className="max-w-4xl mx-auto">

        {/* Judul */}
        <h1 className="text-4xl font-bold text-blue-600 text-center mb-12">
          Profil Pengguna
        </h1>

        {/* CARD PROFILE MAIN */}
        <div className="bg-white border rounded-2xl shadow-sm p-8">

          {/* SECTION: Identitas */}
          <div className="flex items-center gap-6 pb-8 border-b">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
              <User size={45} className="text-blue-600" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800">{user.nama}</h2>
              <p className="text-gray-500 text-sm flex items-center gap-1">
                <Mail size={16} /> {user.email}
              </p>
            </div>
          </div>

          {/* SECTION: Detail Informasi */}
          <div className="grid sm:grid-cols-2 gap-6 mt-8">

            <div className="p-4 border rounded-xl bg-gray-50">
              <p className="text-xs text-gray-500 uppercase">Nama Lengkap</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {user.nama}
              </p>
            </div>

            <div className="p-4 border rounded-xl bg-gray-50">
              <p className="text-xs text-gray-500 uppercase">Email</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {user.email}
              </p>
            </div>

            <div className="p-4 border rounded-xl bg-gray-50">
              <p className="text-xs text-gray-500 uppercase">Role</p>
              <p className="text-lg font-semibold text-gray-800 capitalize mt-1 flex items-center gap-2">
                <BadgeCheck size={18} className="text-blue-600" />
                {user.role}
              </p>
            </div>

            <div className="p-4 border rounded-xl bg-gray-50">
              <p className="text-xs text-gray-500 uppercase">Status Akun</p>
              <p className="text-lg font-semibold text-green-600 mt-1">
                Aktif
              </p>
            </div>

          </div>

          {/* BUTTON SECTION */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <button className="flex items-center gap-2 border border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-600 hover:text-white transition shadow-sm">
              <Pencil size={18} />
              Edit Profil
            </button>

            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition shadow-sm"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </div>
      </div>
    </main>
  );
}
