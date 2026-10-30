"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Video,
  RefreshCw,
  Scissors,
  VolumeX,
  Headphones,
  Info,
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Compressor",
    mobileLabel: "Video Compressor",
    href: "/",
    matchPrefix: "/video",
    icon: Video,
  },
  {
    label: "Converter",
    mobileLabel: "Video Converter",
    href: "/convert",
    matchPrefix: "/convert",
    icon: RefreshCw,
  },
  {
    label: "Trimmer",
    mobileLabel: "Lossless Video Trimmer",
    href: "/trim-video",
    matchPrefix: "/trim-video",
    icon: Scissors,
  },
  {
    label: "Muter",
    mobileLabel: "Remove Audio (Muter)",
    href: "/remove-audio",
    matchPrefix: "/remove-audio",
    icon: VolumeX,
  },
  {
    label: "Extract Audio",
    mobileLabel: "Extract Audio (MP3/WAV)",
    href: "/extract-audio",
    matchPrefix: "/extract-audio",
    icon: Headphones,
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const isItemActive = (href: string, matchPrefix: string) => {
    if (href === "/") {
      return pathname === "/" || pathname.startsWith(matchPrefix);
    }
    return pathname === href || pathname.startsWith(matchPrefix);
  };

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-50 w-full">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-2.5 font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group shrink-0">
          <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs group-hover:bg-indigo-700 transition-colors">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4">
              <polyline points="4 14 10 14 10 20" />
              <polyline points="20 10 14 10 14 4" />
              <line x1="14" y1="10" x2="21" y2="3" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </span>
          <span>
            Clip<span className="text-indigo-600">Shrink</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 text-sm">
          {NAV_ITEMS.map((item) => {
            const active = isItemActive(item.href, item.matchPrefix);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  active
                    ? "bg-indigo-50 text-indigo-700 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 font-medium"
                }`}>
                {item.label}
              </Link>
            );
          })}
          <span className="h-4 w-px bg-slate-200 mx-1.5" />
          <Link
            href="/about"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              pathname === "/about"
                ? "bg-slate-100 text-slate-900 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 font-medium"
            }`}>
            About
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer">
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Slide-Down Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-1 shadow-xl">
          <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 px-3 pb-1.5">
            Tools
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item.href, item.matchPrefix);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  active
                    ? "bg-indigo-50 text-indigo-700 font-semibold"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-medium"
                }`}>
                <Icon
                  className={`w-4 h-4 ${
                    active ? "text-indigo-600" : "text-slate-400"
                  }`}
                />
                <span>{item.mobileLabel}</span>
              </Link>
            );
          })}

          <div className="pt-2 mt-2 border-t border-slate-100">
            <Link
              href="/about"
              onClick={closeMenu}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>About ClipShrink</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
