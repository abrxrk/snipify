"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Code2, Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
        scrolled ? "py-2" : "py-5"
      )}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between transition-all duration-500",
            scrolled
              ? "px-6 py-3 bg-white/90 backdrop-blur-xl rounded-full border border-neutral-200 shadow-lg"
              : "px-0 py-0 bg-transparent"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#01295F] text-white shadow-md transition-transform group-hover:scale-105">
              <Code2 size={16} strokeWidth={2.5} />
            </span>
            <span className="text-lg font-bold text-primaryText tracking-tight">
              Snippify
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-neutral-600 hover:text-[#01295F] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              size="sm"
              className="bg-[#01295F] text-white hover:bg-[#01295F]/90 shadow-sm"
            >
              Let&apos;s go
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-md text-neutral-600"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden mt-2 bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-100 px-6 py-4 flex flex-col gap-4 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-neutral-700 hover:text-[#01295F] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-neutral-100">
              <Button size="sm" className="w-full bg-[#01295F] text-white hover:bg-[#01295F]/90">
                Let&apos;s go
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
