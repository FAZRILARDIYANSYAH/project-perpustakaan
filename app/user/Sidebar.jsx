"use client";
import { Home, BookOpen, History, User, LogOut, Menu, CheckCircle, Heart } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar({ isOpen, toggleSidebar, role = "user" }) {
  const pathname = usePathname();
  const router = useRouter();

  // 🎯 Tentukan menu berdasarkan role
  const menus =
    role === "admin"
      ? [
          { name: "Dashboard", icon: <Home size={20} />, path: "/admin" },
          { name: "Kelola Buku", icon: <BookOpen size={20} />, path: "/admin/tambah-buku" },
          { name: "Konfirmasi Peminjaman", icon: <CheckCircle size={20} />, path: "/admin/peminjaman" },
        ]
      : [
          { name: "Beranda", icon: <Home size={20} />, path: "/user" },
          { name: "Koleksi", icon: <BookOpen size={20} />, path: "/user/koleksi" },
          { name: "Wishlist", icon: <Heart size={20} />, path: "/user/wishlist" },
          { name: "Profil", icon: <User size={20} />, path: "/user/profile" },
        ];

  const handleLogout = async () => {
    // Hapus localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Panggil API untuk hapus cookie HttpOnly
    await fetch("/api/logout", { method: "GET" });

    // Redirect
    router.push("/");
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-md flex flex-col justify-between z-40 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200">
        {isOpen && (
          <h1 className="text-xl font-bold text-blue-600 tracking-wide">
            Learn<span className="text-black">Sphere</span>
          </h1>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* MENU */}
      <nav className="flex-1 mt-4">
        {menus.map((menu, index) => {
          const isActive = pathname === menu.path;
          return (
            <Link
              key={index}
              href={menu.path}
              className={`flex items-center gap-3 rounded-xl mx-3 px-4 py-2.5 mb-1 text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-blue-600 hover:bg-blue-50 hover:text-blue-800"
              }`}
            >
              {menu.icon}
              {isOpen && <span>{menu.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div className="px-3 mb-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full rounded-xl px-4 py-2 text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 hover:text-red-700 transition-all"
        >
          <LogOut size={18} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>

      {/* FOOTER */}
      <div className="px-4 py-3 text-xs text-gray-400 border-t border-gray-100 text-center">
        © 2025 LearnSphere
      </div>
    </aside>
  );
}
