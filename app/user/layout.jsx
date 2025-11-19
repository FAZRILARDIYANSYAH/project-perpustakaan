"use client";

import { useState } from "react";
import { Toaster } from "react-hot-toast";   // ⬅️ WAJIB ADA
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function UserLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-gradient-to-b from-white to-blue-50 overflow-hidden text-gray-800">

      {/* 🔔 Toaster agar semua halaman bisa munculkan alert */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Konten utama */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Topbar kalau mau diaktifkan */}
        {/* <Topbar /> */}

        <main className="pt-20 px-8 overflow-y-auto h-full transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
