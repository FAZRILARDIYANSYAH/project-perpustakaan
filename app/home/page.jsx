"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Cek login
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(userData));
  }, [router]);

  // 📚 Ambil daftar buku
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/books", { cache: "no-store" });
        if (!res.ok) throw new Error("Gagal Fetch API");

        const data = await res.json();
        setBooks(data || []);
      } catch (error) {
        console.error("Gagal fetch buku:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-700 text-lg">Memuat data...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* ✅ NAVBAR */}
      <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-md bg-white/70 shadow-md transition-all duration-300 flex items-center justify-between px-12 py-4">
        <h1 className="text-3xl font-bold">
          <span className="text-blue-600">Learn</span>
          <span className="text-black">Sphere</span>
        </h1>

        <div className="hidden md:flex text-blue-600 font-medium text-lg gap-6">
          <p>
            Hi,{" "}
            <span className="font-semibold text-black">{user.nama}</span>
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="px-6 py-2 border border-black rounded-full hover:bg-gray-100 text-black transition"
        >
          Logout
        </button>
      </nav>

      {/* ✅ HERO SECTION */}
      <section className="pt-36 pb-20 text-center">
        <h2 className="text-5xl font-extrabold text-blue-600 drop-shadow-lg">
          Welcome to LearnSphere Library
        </h2>
        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
          Temukan berbagai koleksi buku digital terbaik dan perluas
          wawasanmu di mana saja, kapan saja.
        </p>
      </section>

      {/* ✅ GRID BUKU */}
      <div className="max-w-6xl mx-auto px-8 pb-20">
        {loading ? (
          <p className="text-center text-gray-600 mt-10">
            Memuat buku...
          </p>
        ) : books.length === 0 ? (
          <p className="text-center text-gray-600 mt-10">
            Belum ada buku tersedia.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {books.slice(0, 6).map((book) => (
              <div
                key={book.id_buku}
                className="bg-white border rounded-2xl shadow-sm hover:shadow-xl transition p-4 flex flex-col items-center text-center"
              >
                <div className="w-full h-56 flex items-center justify-center mb-4 bg-gray-50 rounded-xl">
                  <img
                    src={book.coverImage || "/placeholder-book.png"}
                    alt={book.judul}
                    className="max-h-full object-contain rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-blue-600 line-clamp-2">
                  {book.judul}
                </h3>
                <p className="text-gray-700 text-sm mt-1">
                  Penulis: {book.penulis}
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  Kategori: {book.kategori}
                </p>

                <Link
                  href={`/detail-books/${book.id_buku}`}
                  className="mt-auto inline-block border border-blue-600 text-blue-600 px-5 py-2 rounded-full hover:bg-blue-600 hover:text-white transition text-sm font-medium"
                >
                  Lihat Detail
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ FOOTER */}
      <footer className="bg-slate-100 py-10 sm:px-10 px-6 tracking-wide">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            LearnSphere Library
          </h2>
          <p className="text-sm mt-4 text-slate-600 leading-relaxed max-w-xl mx-auto">
            Akses ribuan buku digital dan materi pembelajaran yang
            mendukung pendidikan yang lebih modern dan mudah diakses.
          </p>
          <p className="mt-6 text-gray-500 text-sm">
            © 2025 LearnSphere Library. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
