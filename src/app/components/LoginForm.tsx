"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Login successful!");
        setTimeout(() => {
          router.push("/dashboard"); // 🔁 redirect here
        }, 1000);
      } else {
        setMessage(`❌ ${data.error || "Invalid credentials."}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4 p-6 border border-gray-700 rounded-lg shadow-lg bg-gray-900 text-white"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:border-blue-500"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:border-blue-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 py-3 rounded hover:bg-green-700 transition-colors disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {message && (
        <p
          className={`mt-2 text-center ${
            message.startsWith("✅") ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}

      <p className="mt-6 text-sm text-center text-gray-400">
        New to EduManage?{" "}
        <Link
          href="/register/user"
          className="text-blue-400 hover:underline hover:text-blue-300"
        >
          Register now
        </Link>
      </p>
    </form>
  );
}
