"use client";

import { useState } from "react";

interface UserRegisterFormProps {
  collegeId: string;
}

export default function UserRegisterForm({ collegeId }: UserRegisterFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "faculty", // default
    departmentId: "",
    courseId: "",
    subprogramId: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Prepare payload; send null for empty optional fields
      const payload = {
        ...formData,
        collegeId,
        departmentId: formData.departmentId || null,
        courseId: formData.courseId || null,
        subprogramId: formData.subprogramId || null,
      };

      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(
          `✅ ${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} registered successfully!`
        );
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "faculty",
          departmentId: "",
          courseId: "",
          subprogramId: "",
        });
      } else {
        setMessage(`❌ ${data.error || "Failed to register user."}`);
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
      className="max-w-md mx-auto space-y-4 p-4 border rounded shadow"
    >
      <h2 className="text-2xl font-semibold text-center">Register User</h2>

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
        <option value="faculty">Faculty</option>
        <option value="student">Student</option>
      </select>

      {/* Optional fields */}
      <input
        name="departmentId"
        placeholder="Department ID (optional)"
        value={formData.departmentId}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        name="courseId"
        placeholder="Course ID (optional)"
        value={formData.courseId}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        name="subprogramId"
        placeholder="Subprogram ID (optional)"
        value={formData.subprogramId}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
      >
        {loading ? "Registering..." : "Register User"}
      </button>

      {message && <p className="text-center mt-2">{message}</p>}
    </form>
  );
}
