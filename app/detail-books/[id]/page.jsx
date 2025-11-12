"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import Link from "next/link";

export default function DetailBookPage({ params }) {
  const router = useRouter();
  const { id: bookId } = use(params);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // ✅ Cek login
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [router]);

  // ✅ Fetch detail buku
  useEffect(() => {
    if (!bookId) return;
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${bookId}`, { cache: "no-store" });
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  if (loading)
    return (
      <main className="h-screen flex justify-center items-center bg-white text-blue-600">
        Memuat detail buku...
      </main>
    );

  if (!book)
    return (
      <main className="h-screen flex justify-center items-center bg-red-50 text-red-600">
        Buku tidak ditemukan
      </main>
    );

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* ✅ NAVBAR */}
      <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-md bg-white/70 shadow-md transition-all duration-300 flex items-center justify-between px-12 py-4">
        <h1 className="text-3xl font-bold">
          <span className="text-blue-600">Learn</span>
          <span className="text-black">Sphere</span>
        </h1>

        <button
          onClick={() => router.push("/home")}
          className="px-5 py-2 border border-black rounded-full hover:bg-gray-100 text-black transition text-sm"
        >
          Kembali ke Home
        </button>
      </nav>

      {/* ✅ DETAIL CARD */}
      <section className="pt-32 pb-20 px-6 flex justify-center">
        <div className="bg-white shadow-xl rounded-2xl border border-gray-200 max-w-3xl w-full p-8 text-center">
          <img
            src={
              book.coverImage ||
              (book?.judul
                ? `/${book.judul.toLowerCase().replace(/ /g, "-")}.jpg`
                : "/placeholder-book.png")
            }
            alt={book?.judul || "Gambar Buku"}
            className="w-full max-h-[400px] object-contain rounded-xl mb-6 bg-gray-50"
          />

          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            {book.judul}
          </h2>
          <div className="text-gray-700 space-y-2 mb-8">
            <p><span className="font-semibold">Penulis:</span> {book.penulis}</p>
            <p><span className="font-semibold">Penerbit:</span> {book.penerbit}</p>
            <p><span className="font-semibold">Tahun:</span> {book.tahun}</p>
            <p><span className="font-semibold">Kategori:</span> {book.kategori || "-"}</p>
            <p><span className="font-semibold">Stok:</span> {book.stok}</p>
          </div>

          <Link
            href="/peminjaman"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-medium transition"
          >
            Pinjam Buku
          </Link>
        </div>
      </section>

      {/* ✅ FOOTER */}
      <footer className="bg-slate-100 py-10 sm:px-10 px-6 tracking-wide">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            LearnSphere Library
          </h2>
          <p className="text-sm mt-4 text-slate-600 leading-relaxed max-w-xl mx-auto">
            Akses ribuan buku digital dan materi pembelajaran yang mendukung pendidikan yang
            lebih modern dan mudah diakses.
          </p>
          <p className="mt-6 text-gray-500 text-sm">
            © 2025 LearnSphere Library. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
