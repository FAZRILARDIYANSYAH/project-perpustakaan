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

  if (loading) return <p>Memuat detail...</p>;
  if (!book) return <p>Buku tidak ditemukan</p>;

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <section className="pt-32 pb-20 px-6 flex justify-center">
        <div className="bg-white shadow-xl rounded-2xl border p-8 max-w-3xl w-full text-center">
          
          {/* FOTO BUKU */}
          <img
            src={book.coverImage}
            alt={book.judul}
            className="w-full max-h-[400px] object-contain rounded-xl mb-6 bg-gray-50"
          />

          {/* JUDUL */}
          <h2 className="text-3xl font-bold text-blue-600 mb-4">{book.judul}</h2>

          {/* DETAIL */}
          <div className="text-gray-700 space-y-1 mb-6">
            <p><b>Penulis:</b> {book.penulis}</p>
            <p><b>Penerbit:</b> {book.penerbit}</p>
            <p><b>Tahun:</b> {book.tahun}</p>
            <p><b>Kategori:</b> {book.kategori}</p>
            <p><b>Stok:</b> {book.stok}</p>
          </div>

          {/* 🔵 TOMBOL PINJAM */}
          <button
            onClick={() => {
              localStorage.setItem("selectedBook", JSON.stringify(book));
              router.push("/user/peminjaman");
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-medium transition"
          >
            Pinjam Buku
          </button>

        </div>
      </section>
    </main>
  );
}
