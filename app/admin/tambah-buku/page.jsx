"use client";

import { useEffect, useState, useRef } from "react";
import { Plus, Trash2, BookOpen, Pencil, Save, X } from "lucide-react";

export default function KelolaBukuPage() {
  const [bukuList, setBukuList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ref untuk auto-scroll ke form
  const formRef = useRef(null);

  const [form, setForm] = useState({
    judul: "",
    penulis: "",
    penerbit: "",
    tahun: "",
    stok: "",
    kategori: "",
    cover: "",
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/books");
      const data = await res.json();
      setBukuList(data);
    } catch (err) {
      console.error("Gagal memuat buku:", err);
    } finally {
      setLoading(false);
    }
  };

  // Tambah atau Update Buku
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit ? `/api/books/${editId}` : "/api/books";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Gagal menyimpan buku");

      alert(isEdit ? "Buku berhasil diperbarui!" : "Buku berhasil ditambahkan!");

      setForm({
        judul: "",
        penulis: "",
        penerbit: "",
        tahun: "",
        stok: "",
        kategori: "",
        cover: "",
      });

      setIsEdit(false);
      setEditId(null);
      fetchBooks();
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan buku.");
    }
  };

  // Tombol Hapus Buku
  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus buku ini?")) return;

    try {
      const res = await fetch(`/api/books/${id}`, { method: "DELETE" });

      if (!res.ok) throw new Error("Gagal menghapus buku");

      alert("Buku berhasil dihapus!");
      fetchBooks();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus buku.");
    }
  };

  // Tombol Edit → scroll ke atas
  const handleEdit = (b) => {
    setIsEdit(true);
    setEditId(b.id_buku);

    setForm({
      judul: b.judul,
      penulis: b.penulis,
      penerbit: b.penerbit,
      tahun: b.tahun,
      stok: b.stok,
      kategori: b.kategori,
      cover: b.coverImage,
    });

    // Scroll otomatis ke form
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleCancel = () => {
    setIsEdit(false);
    setEditId(null);
    setForm({
      judul: "",
      penulis: "",
      penerbit: "",
      tahun: "",
      stok: "",
      kategori: "",
      cover: "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Memuat data buku...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white p-8 rounded-3xl shadow-xl border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg">
              <BookOpen className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-blue-600">Kelola Buku</h1>
              <p className="text-gray-600 text-lg">Tambah, edit, dan hapus koleksi buku perpustakaan</p>
            </div>
          </div>
        </div>

        {/* Form Tambah / Edit */}
        <div
          ref={formRef}
          className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              {isEdit ? (
                <>
                  <Pencil size={24} className="text-blue-600" />
                  Edit Buku
                </>
              ) : (
                <>
                  <Plus size={24} className="text-blue-600" />
                  Tambah Buku Baru
                </>
              )}
            </h2>
            {isEdit && (
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-all"
              >
                <X size={18} />
                Batal
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Judul Buku"
              value={form.judul}
              onChange={(e) => setForm({ ...form, judul: e.target.value })}
              className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl outline-none transition-all"
            />
            <input
              type="text"
              placeholder="Penulis"
              value={form.penulis}
              onChange={(e) => setForm({ ...form, penulis: e.target.value })}
              className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl outline-none transition-all"
            />
            <input
              type="text"
              placeholder="Penerbit"
              value={form.penerbit}
              onChange={(e) => setForm({ ...form, penerbit: e.target.value })}
              className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl outline-none transition-all"
            />
            <input
              type="number"
              placeholder="Tahun"
              value={form.tahun}
              onChange={(e) => setForm({ ...form, tahun: e.target.value })}
              className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl outline-none transition-all"
            />
            <input
              type="number"
              placeholder="Stok"
              value={form.stok}
              onChange={(e) => setForm({ ...form, stok: e.target.value })}
              className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl outline-none transition-all"
            />
            <input
              type="text"
              placeholder="Kategori"
              value={form.kategori}
              onChange={(e) => setForm({ ...form, kategori: e.target.value })}
              className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl outline-none transition-all"
            />
          </div>

          <input
            type="text"
            placeholder="Link Cover Buku (https://...)"
            value={form.cover}
            onChange={(e) => setForm({ ...form, cover: e.target.value })}
            className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl w-full mb-6 outline-none transition-all"
          />

          <button 
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            <Save size={20} />
            {isEdit ? "Simpan Perubahan" : "Tambah Buku"}
          </button>
        </div>

        {/* Daftar Buku */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              📚 Daftar Buku
            </h2>
            <span className="text-sm text-gray-500 bg-blue-50 px-4 py-2 rounded-full font-medium">
              {bukuList.length} Total
            </span>
          </div>

          {bukuList.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-blue-400" size={40} />
              </div>
              <p className="text-gray-500 text-lg font-medium">Belum ada data buku</p>
              <p className="text-gray-400 text-sm mt-2">Tambahkan buku pertama Anda</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-50 border-b-2 border-blue-100">
                    <th className="p-4 font-bold text-gray-700">Judul</th>
                    <th className="p-4 font-bold text-gray-700">Penulis</th>
                    <th className="p-4 font-bold text-gray-700">Kategori</th>
                    <th className="p-4 font-bold text-gray-700">Stok</th>
                    <th className="p-4 font-bold text-gray-700">Cover</th>
                    <th className="p-4 font-bold text-gray-700 text-center">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {bukuList.map((b) => (
                    <tr key={b.id_buku} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="p-4 font-semibold text-gray-800">{b.judul}</td>
                      <td className="p-4 text-gray-700">{b.penulis}</td>
                      <td className="p-4">
                        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                          {b.kategori}
                        </span>
                      </td>
                      <td className="p-4 text-gray-700">{b.stok}</td>

                      <td className="p-4">
                        <img
                          src={b.coverImage}
                          alt={b.judul}
                          className="w-14 h-20 object-cover rounded-lg shadow-md"
                        />
                      </td>

                      <td className="p-4">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleEdit(b)}
                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all hover:scale-110 shadow-md"
                            title="Edit buku"
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            onClick={() => handleDelete(b.id_buku)}
                            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-all hover:scale-110 shadow-md"
                            title="Hapus buku"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}