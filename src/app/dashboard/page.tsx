"use client";

import React from "react";
import Dashboard from "@/app/components/Dashboard";
import { NavbarDemo } from "@/app/components/NavbarDemo";

export default function DashboardPage() {
  return (
    <>
      {/* Fixed Navbar at top */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavbarDemo />
      </div>

      {/* Dashboard content */}
      <Dashboard />
    </>
  );
}
