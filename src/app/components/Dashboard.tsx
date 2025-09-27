"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaUniversity,
  FaBuilding,
  FaProjectDiagram,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaCalendarAlt,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "@/app/context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // While redirecting or no user, render nothing
  if (!user) return null;

  // Define nav links with allowed roles
  const navLinks = [
    { name: "Colleges", href: "/dashboard/colleges", icon: <FaUniversity size={20} />, roles: ["ADMIN"] },
    { name: "Departments", href: "/dashboard/departments", icon: <FaBuilding size={20} />, roles: ["ADMIN"] },
    { name: "Add Programs", href: "/dashboard/programs", icon: <FaProjectDiagram size={20} />, roles: ["ADMIN"] },
    { name: "Add Faculties", href: "/dashboard/faculties", icon: <FaChalkboardTeacher size={20} />, roles: ["ADMIN"] },
    { name: "Add Students", href: "/dashboard/students", icon: <FaUserGraduate size={20} />, roles: ["ADMIN", "FACULTY"] },
    { name: "Timetable", href: "/dashboard/timetable", icon: <FaCalendarAlt size={20} />, roles: ["ADMIN", "FACULTY"] },
    { name: "Profile", href: "/dashboard/profile", icon: <FaUserCircle size={20} />, roles: ["ADMIN", "FACULTY", "STUDENT"] },
  ];

  // Filter nav links based on user role
  const filteredNavLinks = navLinks.filter((link) => link.roles.includes(user.role));

  // Cards to show on dashboard overview, filtered by role
  const cards = [
    { title: "Add Department", href: "/dashboard/departments", desc: "Create and manage academic departments.", roles: ["ADMIN"] },
    { title: "Add Programs & Subprograms", href: "/dashboard/programs", desc: "Organize programs under departments.", roles: ["ADMIN"] },
    { title: "Add Faculty", href: "/dashboard/faculties", desc: "Add and assign teaching staff.", roles: ["ADMIN"] },
    { title: "Add Students", href: "/dashboard/students", desc: "Enroll new students in programs.", roles: ["ADMIN", "FACULTY"] },
    { title: "Manage Timetable", href: "/dashboard/timetable", desc: "Generate and modify class schedules.", roles: ["ADMIN", "FACULTY"] },
  ];

  const filteredCards = cards.filter((card) => card.roles.includes(user.role));

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-16 bg-gray-800 flex flex-col items-center py-4 space-y-4">
        {filteredNavLinks.map(({ name, href, icon }) => (
          <Link
            href={href}
            key={name}
            className="group flex items-center justify-center w-12 h-12 rounded hover:bg-green-600 transition-colors relative"
            aria-label={name}
          >
            {icon}
            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden whitespace-nowrap rounded bg-gray-700 px-2 py-1 text-sm font-medium text-white group-hover:block">
              {name}
            </span>
          </Link>
        ))}

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="w-12 h-12 flex items-center justify-center rounded hover:bg-green-700 transition-colors"
          title="Logout"
        >
          <FaSignOutAlt size={20} />
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-grow p-8 pt-20">
        <h2 className="text-3xl font-semibold mb-6">Admin Dashboard</h2>

        <div className="text-green-400 mb-4">
          Welcome, <strong>{user.name}</strong>!
        </div>

        <section className="bg-gray-800 rounded-lg p-6 shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">Overview</h3>
          <p className="text-gray-300">
            Use the sidebar to manage colleges, departments, programs, faculties, students, and timetables.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map(({ title, desc, href }) => (
            <Card key={title} title={title} desc={desc} href={href} />
          ))}
        </section>
      </main>
    </div>
  );
}

function Card({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <div className="bg-gray-700 p-4 rounded shadow hover:bg-gray-600 transition">
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-gray-300">{desc}</p>
      <Link href={href} className="text-green-400 mt-2 inline-block">
        Go to {title.split(" ")[1]} →
      </Link>
    </div>
  );
}
