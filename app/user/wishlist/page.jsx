"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Heart, BookOpen, Sparkles } from "lucide-react";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist per user
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      const key = `wishlist_${user.email}`;
      const data = localStorage.getItem(key);
      if (data) setWishlist(JSON.parse(data));
    }
  }, []);

  // Hapus item
  const removeWishlist = (id) => {
    const updated = wishlist.filter((item) => item.id_buku !== id);
    setWishlist(updated);

    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      const key = `wishlist_${user.email}`;
      localStorage.setItem(key, JSON.stringify(updated));
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 md:px-8 py-12">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-6 py-3 rounded-full shadow-lg mb-4 border border-blue-200">
            <Heart className="text-red-500 fill-red-500" size={20} />
            <span className="text-sm font-semibold text-blue-600">Your Favorite Books</span>
          </div>

          <h1 className="text-5xl font-extrabold text-blue-600 mb-3">
            Wishlist Kamu
          </h1>

          <p className="text-gray-600 text-lg">
            Koleksi buku favoritmu yang ingin dibaca
          </p>
        </div>

        {/* Stats Card */}
        {wishlist.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-blue-600 p-4 rounded-2xl shadow-lg">
                  <BookOpen className="text-white" size={28} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Wishlist</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {wishlist.length} Buku
                  </p>
                </div>
              </div>
              <Link
                href="/user/koleksi"
                className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all font-semibold shadow-lg hover:shadow-xl"
              >
                <Sparkles size={18} />
                Tambah Buku Lagi
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-blue-100">
            <div className="bg-blue-50 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="text-red-400" size={64} />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Wishlist Masih Kosong
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Mulai tambahkan buku-buku favoritmu ke wishlist untuk membaca nanti
            </p>

            <Link
              href="/user/koleksi"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all font-bold shadow-lg hover:shadow-xl text-lg"
            >
              <Sparkles size={20} />
              Jelajahi Koleksi Buku
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((book) => (
              <div
                key={book.id_buku}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 flex flex-col items-center hover:-translate-y-2 border border-gray-200 hover:border-blue-300"
              >
                {/* Remove Button */}
                <button
                  onClick={() => removeWishlist(book.id_buku)}
                  className="absolute right-4 top-4 z-10 bg-red-600 text-white rounded-full p-2 shadow-lg hover:scale-110 hover:bg-red-700 transition-all"
                  title="Hapus dari wishlist"
                >
                  <X size={18} />
                </button>

                {/* Heart Badge */}
                <div className="absolute left-4 top-4 z-10 bg-white rounded-full p-2 shadow-lg border border-red-200">
                  <Heart className="text-red-500 fill-red-500" size={18} />
                </div>

                {/* Cover */}
                <div className="w-full h-56 flex items-center justify-center mb-4 mt-6 bg-gray-50 rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
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

       
            {/* Mobile CTA */}
      {wishlist.length > 0 && (
        <div className="md:hidden text-center mt-10">
          <Link href="/user/koleksi">
            <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all font-bold shadow-lg hover:shadow-xl">
              <Sparkles size={20} />
              Tambah Buku Lagi
            </button>
          </Link>
        </div>
      )}


      </div>
    </main>
  );
}
