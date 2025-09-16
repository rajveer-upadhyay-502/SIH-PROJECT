"use client";

import { useState } from "react";

export default function CollegeRegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    totalClassrooms: "",
    totalLabs: "",
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
      const res = await fetch("/api/register/college", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ College registered successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          country: "",
          pincode: "",
          totalClassrooms: "",
          totalLabs: "",
          password: "",
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
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4 p-4 border rounded shadow-md"
    >
      <h2 className="text-2xl font-semibold text-center">College Registration</h2>

      {/* Name */}
      <input
        type="text"
        name="name"
        placeholder="College Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Contact Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      {/* Phone */}
      <input
        type="tel"
        name="phone"
        placeholder="Contact Phone"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      {/* Address */}
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      {/* City */}
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      {/* State */}
      <input
        type="text"
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      {/* Country */}
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      {/* Pincode */}
      <input
        type="text"
        name="pincode"
        placeholder="Pin Code"
        value={formData.pincode}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      {/* Total Classrooms */}
      <input
        type="number"
        name="totalClassrooms"
        placeholder="Total Classrooms"
        value={formData.totalClassrooms}
        onChange={handleChange}
        required
        min={0}
        className="w-full p-2 border rounded"
      />

      {/* Total Labs */}
      <input
        type="number"
        name="totalLabs"
        placeholder="Total Labs"
        value={formData.totalLabs}
        onChange={handleChange}
        required
        min={0}
        className="w-full p-2 border rounded"
      />

      {/* Password */}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        {loading ? "Registering..." : "Register College"}
      </button>

      {message && <p className="mt-2 text-sm text-center">{message}</p>}
    </form>
  );
}
