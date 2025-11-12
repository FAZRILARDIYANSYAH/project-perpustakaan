"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, kelas, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Gagal mendaftar");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Registrasi berhasil!");

      if (data.user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/home");
      }

    } catch (err) {
      console.error("Error:", err);
      alert("Terjadi kesalahan, coba lagi nanti");
    }
  };

  return (
    <main className="min-h-screen w-full bg-white flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md border border-gray-200">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Create Account
        </h1>

        <form onSubmit={handleSubmit}>

          {/* Nama */}
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-700">
              Nama
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="border w-full p-3 rounded-xl
              focus:ring-2 focus:ring-blue-300 outline-none
              text-black placeholder-gray-500"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>

          {/* Kelas */}
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-700">
              Kelas
            </label>
            <input
              type="text"
              placeholder="Enter class"
              className="border w-full p-3 rounded-xl
              focus:ring-2 focus:ring-blue-300 outline-none
              text-black placeholder-gray-500"
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="border w-full p-3 rounded-xl
              focus:ring-2 focus:ring-blue-300 outline-none
              text-black placeholder-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="border w-full p-3 rounded-xl
              focus:ring-2 focus:ring-blue-300 outline-none
              text-black placeholder-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>

          <p className="text-sm text-center mt-5 text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
