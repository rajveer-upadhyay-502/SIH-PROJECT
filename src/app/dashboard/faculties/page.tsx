"use client";

import React, { useState, useEffect } from "react";

interface Faculty {
  _id: string;
  name: string;
  email: string;
  department: string;
}

export default function FacultiesPage() {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search,
    });

    fetch(`/api/faculty?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch faculties");
        return res.json();
      })
      .then((data) => {
        setFaculties(data.faculties);
        setTotal(data.total);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page, search]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Faculties</h1>

      <input
        type="text"
        placeholder="Search faculties..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // Reset page on search change
        }}
        className="mb-4 p-2 border rounded w-full max-w-md"
      />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && faculties.length === 0 && <p>No faculties found.</p>}

      {!loading && faculties.length > 0 && (
        <>
          <table className="w-full table-auto border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-600 p-2">Name</th>
                <th className="border border-gray-600 p-2">Email</th>
                <th className="border border-gray-600 p-2">Department</th>
              </tr>
            </thead>
            <tbody>
              {faculties.map((faculty) => (
                <tr key={faculty._id} className="hover:bg-gray-700">
                  <td className="border border-gray-600 p-2">{faculty.name}</td>
                  <td className="border border-gray-600 p-2">{faculty.email}</td>
                  <td className="border border-gray-600 p-2">{faculty.department}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="px-3 py-1">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
