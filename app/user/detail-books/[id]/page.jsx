"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

export default function DetailBookPage({ params }) {
  const router = useRouter();
  const { id } = use(params);

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Cek login
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, [router]);

  // 🔍 Fetch detail buku
  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Gagal fetch detail");

        const data = await res.json();

        setBook({
          ...data,
          coverImage: data.cover?.startsWith("http")
            ? data.cover
            : data.cover
            ? `/cover/${data.cover}`
            : "/placeholder-book.png",
        });
      } catch (error) {
        console.error(error);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
          <p className="text-gray-600 font-medium">Memuat detail...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-gray-700 font-medium text-lg">Buku tidak ditemukan</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <section className="pt-32 pb-20 px-6 flex justify-center">
        <div className="bg-white shadow-2xl rounded-3xl border border-gray-100 overflow-hidden max-w-4xl w-full">
          
          <div className="grid md:grid-cols-5 gap-8 p-8">
            
            {/* FOTO BUKU - Left Column */}
            <div className="md:col-span-2 flex items-center justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <img
                  src={book.coverImage}
                  alt={book.judul}
                  className="relative w-full max-h-[450px] object-contain rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* DETAIL - Right Column */}
            <div className="md:col-span-3 flex flex-col justify-center">
              
              {/* JUDUL */}
              <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {book.judul}
              </h1>

              {/* DETAIL GRID */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-xl border-l-4 border-blue-500">
                  <span className="text-2xl"></span>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Penulis</p>
                    <p className="text-gray-900 font-semibold">{book.penulis}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-indigo-50 to-transparent rounded-xl border-l-4 border-indigo-500">
                  <span className="text-2xl"></span>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Penerbit</p>
                    <p className="text-gray-900 font-semibold">{book.penerbit}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-purple-50 rounded-xl text-center border border-purple-100">
                    <p className="text-sm text-gray-500 font-medium mb-1">Tahun</p>
                    <p className="text-xl font-bold text-purple-600">{book.tahun}</p>
                  </div>

                  <div className="p-4 bg-pink-50 rounded-xl text-center border border-pink-100">
                    <p className="text-sm text-gray-500 font-medium mb-1">Kategori</p>
                    <p className="text-xl font-bold text-pink-600">{book.kategori}</p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-xl text-center border border-green-100">
                    <p className="text-sm text-gray-500 font-medium mb-1">Stok</p>
                    <p className="text-xl font-bold text-green-600">{book.stok}</p>
                  </div>
                </div>
              </div>

              {/* 🔵 TOMBOL PINJAM */}
              <button
                onClick={() => {
                  localStorage.setItem("selectedBook", JSON.stringify(book));
                  router.push("/user/peminjaman");
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <span className="text-xl"></span>
                Pinjam Buku Sekarang
              </button>

            </div>

          </div>
        </div>
      </section>
    </main>
  );
} 