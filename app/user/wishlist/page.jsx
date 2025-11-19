"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

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
    <main className="min-h-screen bg-white text-gray-800 px-8 py-12">
      <h1 className="text-4xl font-bold text-blue-600 text-center mb-10">
        Wishlist Kamu ❤️
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-600 text-lg">Wishlist masih kosong.</p>

          <Link
            href="/user/home"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition"
          >
            Cari Buku
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {wishlist.map((book) => (
            <div
              key={book.id_buku}
              className="relative bg-white border rounded-2xl shadow-sm hover:shadow-xl transition p-4 flex flex-col items-center text-center"
            >
              <button
                onClick={() => removeWishlist(book.id_buku)}
                className="absolute right-4 top-4 bg-red-100 p-2 rounded-full hover:bg-red-200 transition"
              >
                <X size={20} className="text-red-500" />
              </button>

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
    </main>
  );
}
