"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CollegeRegisterForm() {
  const router = useRouter();

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
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/college", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
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
        });

        // Redirect to admin register page with collegeId
        router.push(`/admin/register?collegeId=${data.collegeId}`);
      } else {
        setMessage(`❌ ${data.error || "Failed to register college."}`);
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
      className="max-w-md mx-auto space-y-4 p-4 border rounded shadow bg-grey-600"
    >
      <h2 className="text-2xl font-semibold text-center">Register College</h2>

      <input
        name="name"
        placeholder="College Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Contact Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="phone"
        placeholder="Contact Phone"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="pincode"
        placeholder="Pin Code"
        value={formData.pincode}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="totalClassrooms"
        placeholder="Total Classrooms"
        value={formData.totalClassrooms}
        onChange={handleChange}
        min={0}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="totalLabs"
        placeholder="Total Labs"
        value={formData.totalLabs}
        onChange={handleChange}
        min={0}
        required
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 cursor-pointer"
      >
        {loading ? "Registering..." : "Register College"}
      </button>

      {message && <p className="text-center mt-2">{message}</p>}
    </form>
  );
}
