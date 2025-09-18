"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserRegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
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

    if (!formData.role) {
      setMessage("❌ Please select a user role.");
      setLoading(false);
      return;
    }

    try {
      const payload = { ...formData };
      const res = await fetch("/api/register/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ User registered successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "",
        });

        if (payload.role === "admin") {
          if (data.isNewAdmin) {
            router.push("/register/college");
          } else {
            router.push("/dashboard");
          }
        } else {
          router.push("/dashboard");
        }
      } else {
        setMessage(`❌ ${data.error || "Something went wrong."}`);
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
      <h2 className="text-2xl font-semibold text-center mb-4">User Registration</h2>

      {/* Name */}
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:border-blue-500"
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:border-blue-500"
      />

      {/* Password */}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:border-blue-500"
      />

      {/* Role Selection */}
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
        className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
      >
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="faculty">Faculty</option>
        <option value="student">Student</option>
      </select>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 py-3 rounded hover:bg-green-700 transition-colors disabled:opacity-50"
      >
        {loading ? "Registering..." : "Register User"}
      </button>

      {/* Message */}
      {message && (
        <p
          className={`mt-2 text-center ${
            message.startsWith("✅") ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}


