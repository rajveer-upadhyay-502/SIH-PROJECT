"use client";

import { useState } from "react";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT", // optional role selection
    institutionId: "", // optional for now
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Registered successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "STUDENT",
          institutionId: "",
        });
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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4 border rounded">
      <h2 className="text-2xl font-semibold">Register</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
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

      {/* Optional Role Dropdown */}
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="STUDENT">Student</option>
        <option value="ADMIN">Admin</option>
      </select>

      {/* Optional Institution ID field */}
      <input
        type="text"
        name="institutionId"
        placeholder="Institution ID (optional)"
        value={formData.institutionId}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Registering..." : "Register"}
      </button>

      {message && <p className="mt-2 text-sm text-center">{message}</p>}
    </form>
  );
}
