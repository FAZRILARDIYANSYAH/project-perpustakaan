"use client";

import { useState } from "react";
import Sidebar from "@/app/user/Sidebar";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-gradient-to-b from-white to-blue-50 text-gray-800">
      {/* TOASTER GLOBAL */}
      <Toaster position="top-right" />

      {/* SIDEBAR */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} role="admin" />

      {/* MAIN CONTENT */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-20"
        }`}
      >
        <main
          className="
            pt-6 
            px-6 
            overflow-y-auto 
            h-full 
            transition-all 
            duration-300
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}
