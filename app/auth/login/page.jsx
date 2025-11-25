"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.error || "Email atau password salah");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/user");
      }
    } catch (error) {
      setMsg("Terjadi kesalahan, coba lagi nanti");
    }
  };

  return (
    <main className="min-h-screen w-full bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-10 border border-gray-200">
        
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Welcome Back!
        </h1>

        {msg && <p className="text-red-500 text-center mb-3">{msg}</p>}

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              className="border w-full p-3 rounded-xl
                        focus:ring-2 focus:ring-blue-300 outline-none
                        text-black placeholder-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>


          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            LOGIN
          </button>

          <p className="text-sm text-center mt-5 text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-blue-600 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
