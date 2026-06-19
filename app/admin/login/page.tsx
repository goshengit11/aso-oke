"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/app/api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email, password });

      // adapt to API shape: expect { success: boolean, data: { access_token }, message }
      if (response?.success) {
        const token = response.data?.access_token;
        if (token) localStorage.setItem("token", token);
        toast.success("Login successful");
        // wait briefly so toast is visible before navigation
        setTimeout(() => router.push("/admin/dashboard"), 800);
        return;
      }

      const msg = response?.message || "Login failed";
      toast.error(msg);
      setError(msg);
    } catch (err: any) {
      const apiErrorMessage =
        err?.error?.message || err?.message || err?.error || "Login failed";
      const msg =
        typeof apiErrorMessage === "string"
          ? apiErrorMessage
          : JSON.stringify(apiErrorMessage);
      toast.error(msg);
      console.error("Login failed", err);
      setError(msg);
    }
  };

  return (
    <section className="min-h-screen grid md:grid-cols-2">
      {/* LEFT SIDE (IMAGE / BRAND) */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-[#0b1a33] to-[#1f4d8e] text-white p-10">
        <div className="max-w-md">
          <img src="/logo.png" alt="" className="sticky opacity-20" />
          <h1 className="text-4xl font-[serif] mb-4">Welcome Back</h1>
          <p className="text-gray-300 text-sm">
            Manage your Aso Oke store, track orders, update products, and
            monitor your business performance all in one place.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div className="flex items-center justify-center bg-[#f5efe6] px-6">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-lg border border-gray-200 p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-[serif] text-center mb-6 text-[#1a1a1a]">
            Admin Login
          </h2>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#0b1a33] to-[#1f3a5f] text-white py-3 rounded-lg text-sm tracking-wide hover:opacity-90 transition"
            >
              LOGIN
            </button>
          </form>

          <ToastContainer position="top-right" autoClose={3000} />

          <p className="text-xs text-gray-500 text-center mt-6">
            © 2026 Aso Okè Admin Panel
          </p>
        </div>
      </div>
    </section>
  );
}
