"use client";

import { useEffect, useState, useRef } from "react";
import { Plus, Trash2, BookOpen, Pencil } from "lucide-react";

export default function KelolaBukuPage() {
  const [bukuList, setBukuList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  // 🔹 Ref untuk auto-scroll ke form
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
      const res = await fetch("/api/books");
      const data = await res.json();
      setBukuList(data);
    } catch (err) {
      console.error("Gagal memuat buku:", err);
    }
  };

  // 🔹 Tambah atau Update Buku
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

  // 🔹 Tombol Hapus Buku
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

  // 🔹 Tombol Edit → scroll ke atas
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

    // 🔥 Scroll otomatis ke form
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <BookOpen size={28} className="text-blue-600" />
        <h1 className="text-2xl font-semibold text-gray-800">Kelola Buku</h1>
      </div>

      {/* Form Tambah / Edit */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-10"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {isEdit ? "Edit Buku" : "Tambah Buku Baru"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Judul Buku"
            value={form.judul}
            onChange={(e) => setForm({ ...form, judul: e.target.value })}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Penulis"
            value={form.penulis}
            onChange={(e) => setForm({ ...form, penulis: e.target.value })}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Penerbit"
            value={form.penerbit}
            onChange={(e) => setForm({ ...form, penerbit: e.target.value })}
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Tahun"
            value={form.tahun}
            onChange={(e) => setForm({ ...form, tahun: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Stok"
            value={form.stok}
            onChange={(e) => setForm({ ...form, stok: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Kategori"
            value={form.kategori}
            onChange={(e) => setForm({ ...form, kategori: e.target.value })}
            className="border p-2 rounded"
          />
        </div>

        <input
          type="text"
          placeholder="Link Cover Buku (https://...)"
          value={form.cover}
          onChange={(e) => setForm({ ...form, cover: e.target.value })}
          className="border p-2 rounded w-full mb-4"
        />

        <button className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
          {isEdit ? "Simpan Perubahan" : "Tambah Buku"}
        </button>
      </form>

      {/* Daftar Buku */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Daftar Buku 📚</h2>

        {bukuList.length === 0 ? (
          <p className="text-gray-500">Belum ada data buku.</p>
        ) : (
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="p-3">Judul</th>
                <th className="p-3">Penulis</th>
                <th className="p-3">Cover</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {bukuList.map((b) => (
                <tr key={b.id_buku} className="border-b">
                  <td className="p-3">{b.judul}</td>
                  <td className="p-3">{b.penulis}</td>

                  <td className="p-3">
                    <img
                      src={b.coverImage}
                      className="w-14 h-20 object-cover rounded"
                    />
                  </td>

                  <td className="p-3 flex gap-3 justify-center">
                    <button
                      onClick={() => handleEdit(b)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(b.id_buku)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
