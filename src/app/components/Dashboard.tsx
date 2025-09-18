"use client";

import React from "react";
import Link from "next/link";
import {
  FaUniversity,
  FaBuilding,
  FaBook,
  FaCalendarAlt,
  FaUserCircle,
} from "react-icons/fa";

export default function Dashboard() {
  const navLinks = [
    { name: "Colleges", href: "/dashboard/colleges", icon: <FaUniversity size={20} /> },
    { name: "Departments", href: "/dashboard/departments", icon: <FaBuilding size={20} /> },
    { name: "Subjects", href: "/dashboard/subjects", icon: <FaBook size={20} /> },
    { name: "Timetable", href: "/dashboard/timetable", icon: <FaCalendarAlt size={20} /> },
    { name: "Profile", href: "/dashboard/profile", icon: <FaUserCircle size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900 text-white pt-20">
      {/* Sidebar */}
      <aside className="fixed top-20 left-0 z-40 h-[calc(100vh-5rem)] w-16 bg-gray-800 flex flex-col items-center py-4 space-y-4">
        {navLinks.map(({ name, href, icon }) => (
          <Link
            href={href}
            key={name}
            className="group flex items-center justify-center w-12 h-12 rounded hover:bg-green-600 transition-colors relative"
            aria-label={name}
          >
            {icon}
            {/* Tooltip */}
            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden whitespace-nowrap rounded bg-gray-700 px-2 py-1 text-sm font-medium text-white group-hover:block">
              {name}
            </span>
          </Link>
        ))}
      </aside>

      {/* Main content */}
      <main className="flex-grow ml-16 p-8">
        <h2 className="text-3xl font-semibold mb-6">Welcome to your Dashboard</h2>

        <section className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4">Overview</h3>
          <p className="text-gray-300">
            Here you can manage colleges, departments, subjects, and timetables.
            Use the sidebar icons on the left to navigate through different sections.
          </p>
        </section>
      </main>
    </div>
  );
}
