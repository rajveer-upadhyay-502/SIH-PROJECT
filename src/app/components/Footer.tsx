"use client";

import { Facebook, Instagram, Send, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        
        {/* Left: Description */}
        <div className="md:w-1/3">
          <h2 className="text-2xl font-bold mb-3 text-green-500 hover:text-green-400 transition-colors">
            EduManage
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            We provide reliable education management solutions to simplify your workflow. Stay connected with us!
          </p>
        </div>

        {/* Center: Quick Links */}
        <div className="md:w-1/3 flex flex-col items-start md:items-center">
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            {["Home", "About", "Contact", "Login"].map((link) => (
              <li key={link}>
                <Link
                  href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                  className="hover:text-white transition-colors"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Social Media */}
        <div className="md:w-1/3 flex flex-col items-start md:items-end">
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-5 text-gray-400">
            <a
              href="https://facebook.com"
              target="_blank"
              className="hover:text-blue-500 transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="hover:text-pink-500 transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              className="hover:text-green-500 transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
            <a
              href="https://telegram.me/username"
              target="_blank"
              className="hover:text-blue-400 transition-colors"
            >
              <Send className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Optional Bottom Line */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} EduManage. All rights reserved.
      </div>
    </footer>
  );
}
