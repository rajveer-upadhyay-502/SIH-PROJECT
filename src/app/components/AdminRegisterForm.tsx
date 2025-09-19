"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AdminRegisterFormProps {
  collegeId: string | null;
}

export default function AdminRegisterForm({ collegeId }: AdminRegisterFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!collegeId) {
      setMessage("❌ Missing college ID!");
      setLoading(false);
      return;
    }

    try {
      const payload = { ...formData, collegeId };

      const res = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Admin registered successfully!");

        // Clear form
        setFormData({ name: "", email: "", password: "", role: "admin" });

        // Redirect to /dashboard after short delay so user can see success message
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        setMessage(`❌ ${data.error || "Failed to register admin."}`);
      }
    } catch {
      setMessage("❌ Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4 p-4 border rounded shadow bg-gray-900"
    >
      <h2 className="text-2xl font-semibold text-center text-white">Register Admin</h2>

      <input
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      >
        <option value="admin">Admin</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 cursor-pointer"
      >
        {loading ? "Registering..." : "Register Admin"}
      </button>

      {message && <p className="text-center mt-2 text-white">{message}</p>}
    </form>
  );
}
