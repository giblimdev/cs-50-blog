"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: "/public/features", label: "Features" },
  { href: "/admin", label: "Admin" },
];

export default function NavHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm w-full max-w-screen">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-200 font-medium text-sm rounded-md"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-between">
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="text-gray-700 focus:outline-none"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Dropdown menu */}
      {mobileMenuOpen && (
        <div className="mt-2 flex flex-col gap-2 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md text-sm font-medium transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
