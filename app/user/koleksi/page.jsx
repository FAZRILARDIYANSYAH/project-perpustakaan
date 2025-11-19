"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Heart } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // SEARCH & FILTER
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // ❤️ Wishlist State
  const [wishlist, setWishlist] = useState([]);

  // CHECK LOGIN
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(userData));
  }, [router]);

  // LOAD WISHLIST PER USER
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      const key = `wishlist_${user.email}`;
      const data = localStorage.getItem(key);
      if (data) setWishlist(JSON.parse(data));
    }
  }, []);

  // FETCH BOOKS
  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch("/api/books", { cache: "no-store" });

        if (!res.ok) throw new Error("Gagal fetch buku");

        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Gagal fetch buku:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  // DAPATKAN KATEGORI UNIK
  const kategoriList = ["all", ...new Set(books.map((b) => b.kategori))];

  // FILTER SEARCH + CATEGORY
  const filteredBooks = books.filter((book) => {
    const matchSearch = book.judul.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      selectedCategory === "all" ||
      book.kategori.toLowerCase() === selectedCategory.toLowerCase();

    return matchSearch && matchCategory;
  });

  // ❤️ CEK APAKAH BUKU SUDAH ADA DI WISHLIST
  const isWishlisted = (id) => wishlist.some((item) => item.id_buku === id);

  // ❤️ ADD/REMOVE WISHLIST (PER USER!)
  const toggleWishlist = (book) => {
    let updatedWishlist;

    if (isWishlisted(book.id_buku)) {
      updatedWishlist = wishlist.filter((item) => item.id_buku !== book.id_buku);
    } else {
      updatedWishlist = [...wishlist, book];
    }

    setWishlist(updatedWishlist);

    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      const key = `wishlist_${user.email}`;
      localStorage.setItem(key, JSON.stringify(updatedWishlist));
    }
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
      {/* HERO */}
      <section className="pt-5 pb-16 text-center">
        <h2 className="text-5xl font-extrabold text-blue-600 drop-shadow-lg">
          Welcome to LearnSphere Library
        </h2>
        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
          Temukan berbagai koleksi buku digital terbaik dan perluas wawasanmu kapan saja.
        </p>
      </section>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-8 pb-20">
        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-12">
          {/* Search */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
            <input
              type="text"
              placeholder="Cari buku berdasarkan judul..."
              className="w-full pl-14 pr-5 py-4 text-gray-700 bg-white border border-gray-300 rounded-2xl shadow-md focus:ring-2 focus:ring-blue-500 transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-60 py-4 px-4 bg-white border border-gray-300 rounded-2xl shadow-md text-gray-700 focus:ring-2 focus:ring-blue-500 transition"
          >
            {kategoriList.map((kat, i) => (
              <option key={i} value={kat}>
                {kat === "all" ? "Semua Kategori" : kat}
              </option>
            ))}
          </select>
        </div>

        {/* LIST BUKU */}
        {loading ? (
          <p className="text-center text-gray-600 mt-10">Memuat buku...</p>
        ) : filteredBooks.length === 0 ? (
          <p className="text-center text-gray-600 mt-10">Buku tidak ditemukan.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {filteredBooks.map((book) => (
              <div
                key={book.id_buku}
                className="relative bg-white border rounded-2xl shadow-sm hover:shadow-xl transition p-4 flex flex-col items-center text-center"
              >
                {/* ❤️ BUTTON */}
                <button
                  onClick={() => toggleWishlist(book)}
                  className="absolute right-4 top-4"
                >
                  <Heart
                    size={28}
                    className={`transition ${
                      isWishlisted(book.id_buku)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400 hover:text-red-400"
                    }`}
                  />
                </button>

                {/* COVER */}
                <div className="w-full h-56 flex items-center justify-center mb-4 bg-gray-50 rounded-xl overflow-hidden">
                  <img
                    src={book.coverImage}
                    alt={book.judul}
                    className="max-h-full object-contain rounded-lg"
                  />
                </div>

                <h3 className="text-xl font-semibold text-blue-600 line-clamp-2">
                  {book.judul}
                </h3>

                <p className="text-gray-700 text-sm mt-1">Penulis: {book.penulis}</p>
                <p className="text-gray-500 text-sm mb-4">Kategori: {book.kategori}</p>

                <Link
                  href={`/user/detail-books/${book.id_buku}`}
                  className="mt-auto inline-block border border-blue-600 text-blue-600 px-5 py-2 rounded-full hover:bg-blue-600 hover:text-white transition text-sm font-medium"
                >
                  Lihat Detail
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="bg-slate-100 py-10 sm:px-10 px-6 tracking-wide">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900">LearnSphere Library</h2>
          <p className="text-sm mt-4 text-slate-600 max-w-xl mx-auto">
            Akses ribuan buku digital untuk pengalaman pembelajaran modern.
          </p>
          <p className="mt-6 text-gray-500 text-sm">
            © 2025 LearnSphere Library. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
