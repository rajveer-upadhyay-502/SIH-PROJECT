'use client';

import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext"; // Adjust the import path if needed

interface College {
  _id?: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
  totalClassrooms: number;
  totalLabs: number;
  workingHoursPerDay: number;
  lectureDurationMinutes: number;
}

const initialCollegeState: College = {
  name: "",
  address: "",
  city: "",
  state: "",
  country: "",
  pincode: 0,
  totalClassrooms: 0,
  totalLabs: 0,
  workingHoursPerDay: 0,
  lectureDurationMinutes: 0,
};

export default function CollegeDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [college, setCollege] = useState<College | null>(null);
  const [form, setForm] = useState<College>(initialCollegeState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch college data on mount
  useEffect(() => {
    if (!user?._id) return;

    setLoading(true);
    fetch("/api/college", {
      headers: {
        "x-admin-user-id": user._id,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data.success && data.college) {
          setCollege(data.college);
          setForm(data.college);
        }
      })
      .catch(() => setError("Could not load college data"))
      .finally(() => setLoading(false));
  }, [user]);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        ["pincode", "totalClassrooms", "totalLabs", "workingHoursPerDay", "lectureDurationMinutes"].includes(
          name
        )
          ? Number(value)
          : value,
    }));
  };

  // Create or update college
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submitting form, user:", user);
    if (!user?._id) {
      setError("You must be logged in");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const method = college ? "PUT" : "POST";

      const response = await fetch("/api/college", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          adminUserId: user._id,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Failed to save college");
      } else {
        setCollege(data.college);
        setForm(data.college);
        setSuccess(college ? "College updated successfully!" : "College created successfully!");
      }
    } catch (err) {
      setError("Network error: Could not save college");
    }

    setLoading(false);
  };

  // Delete college
  const handleDelete = async () => {
    if (!user?._id) return;

    if (!confirm("Are you sure you want to delete your college?")) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    const res = await fetch("/api/college", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminUserId: user._id }),
    });

    const data = await res.json();

    if (!data.success) {
      setError(data.message || "Failed to delete");
    } else {
      setCollege(null);
      setForm(initialCollegeState);
      setSuccess("College deleted successfully.");
    }
    setLoading(false);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-green-400 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">College Dashboard</h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}
      {success && <p className="mb-4 text-green-500">{success}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded shadow-md w-full max-w-3xl"
      >
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Address", name: "address", type: "text" },
          { label: "City", name: "city", type: "text" },
          { label: "State", name: "state", type: "text" },
          { label: "Country", name: "country", type: "text" },
          { label: "Pincode", name: "pincode", type: "number" },
          { label: "Total Classrooms", name: "totalClassrooms", type: "number" },
          { label: "Total Labs", name: "totalLabs", type: "number" },
          { label: "Working Hours Per Day", name: "workingHoursPerDay", type: "number" },
          { label: "Lecture Duration (minutes)", name: "lectureDurationMinutes", type: "number" },
        ].map(({ label, name, type }) => (
          <div key={name} className="mb-4">
            <label htmlFor={name} className="block mb-1 font-semibold">
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              value={form[name as keyof College] || ""}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
        ))}

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
          >
            {college ? "Update College" : "Add College"}
          </button>

          {college && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition"
            >
              Delete College
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

