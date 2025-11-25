"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Heart, BookOpen, Sparkles, Filter } from "lucide-react";

export default function Koleksi() {
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
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg font-medium">Memuat data...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* HERO */}
      <section className="relative pt-16 pb-20 text-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
          <div className="absolute -bottom-10 left-1/2 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-6 py-3 rounded-full shadow-lg mb-6 border border-blue-200">
            <Sparkles className="text-blue-600" size={20} />
            <span className="text-sm font-semibold text-blue-600">Digital Library Experience</span>
          </div>
          
          <h2 className="text-6xl font-extrabold mb-4 text-blue-600">
            Welcome to
            <br />
            LearnSphere Library
          </h2>
          
          <p className="text-gray-600 mt-6 text-xl max-w-3xl mx-auto leading-relaxed">
            Temukan berbagai koleksi buku digital terbaik dan perluas wawasanmu kapan saja, di mana saja.
          </p>

          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 bg-white px-5 py-2 rounded-full shadow-md border border-blue-100">
              <BookOpen className="text-blue-600" size={18} />
              <span className="text-sm font-medium text-gray-700">{books.length}+ Buku</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-5 py-2 rounded-full shadow-md border border-blue-100">
              <Heart className="text-red-500" size={18} />
              <span className="text-sm font-medium text-gray-700">{wishlist.length} Wishlist</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pb-20">
        {/* SEARCH + FILTER */}
        <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-6 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search */}
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
              <input
                type="text"
                placeholder="Cari buku berdasarkan judul..."
                className="w-full pl-14 pr-5 py-4 text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Category */}
            <div className="relative w-full md:w-64">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer font-medium"
              >
                {kategoriList.map((kat, i) => (
                  <option key={i} value={kat}>
                    {kat === "all" ? "Semua Kategori" : kat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm">
            <p className="text-gray-600">
              Menampilkan <span className="font-bold text-blue-600">{filteredBooks.length}</span> dari{" "}
              <span className="font-bold text-blue-600">{books.length}</span> buku
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-blue-600 hover:text-blue-700 font-medium underline"
              >
                Reset pencarian
              </button>
            )}
          </div>
        </div>

        {/* LIST BUKU */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
            <p className="text-gray-600 font-medium">Memuat koleksi buku...</p>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg border border-blue-100">
            <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="text-blue-400" size={48} />
            </div>
            <p className="text-gray-600 text-xl font-semibold mb-2">Buku tidak ditemukan</p>
            <p className="text-gray-500">Coba kata kunci atau kategori lain</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id_buku}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 flex flex-col items-center hover:-translate-y-2 border border-gray-200 hover:border-blue-300"
              >
                {/* ❤️ BUTTON */}
                <button
                  onClick={() => toggleWishlist(book)}
                  className="absolute right-4 top-4 z-10 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
                >
                  <Heart
                    size={22}
                    className={`transition ${
                      isWishlisted(book.id_buku)
                        ? "fill-red-500 text-red-500 animate-pulse"
                        : "text-gray-400 hover:text-red-400"
                    }`}
                  />
                </button>

                {/* COVER */}
                <div className="w-full h-56 flex items-center justify-center mb-4 bg-gray-50 rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={book.coverImage}
                    alt={book.judul}
                    className="max-h-full object-contain rounded-lg"
                  />
                </div>

                <div className="w-full text-center">
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                    {book.judul}
                  </h3>

                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Penulis:</span> {book.penulis}
                  </p>
                  
                  <div className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    {book.kategori}
                  </div>

                  <Link
                    href={`/user/detail-books/${book.id_buku}`}
                    className="block w-full bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition-all text-sm font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Lihat Detail →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="bg-slate-900 py-16 px-6">
        <div className="max-w-screen-xl mx-auto text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-8 py-3 rounded-full mb-6 border border-white/20">
            <h2 className="text-3xl font-bold text-white">LearnSphere Library</h2>
          </div>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Akses ribuan buku digital untuk pengalaman pembelajaran modern yang tak terbatas.
          </p>
          
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">{books.length}+</p>
              <p className="text-sm text-gray-400">Total Buku</p>
            </div>
            <div className="h-12 w-px bg-white/20"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">{kategoriList.length - 1}</p>
              <p className="text-sm text-gray-400">Kategori</p>
            </div>
            <div className="h-12 w-px bg-white/20"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">24/7</p>
              <p className="text-sm text-gray-400">Akses Terbuka</p>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8">
            <p className="text-gray-400 text-sm">
              © 2025 LearnSphere Library. All rights reserved. Made with 💙
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}