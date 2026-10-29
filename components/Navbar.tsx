"use client";

import React, { useState } from "react";
import Link from "next/link";
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 w-full">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-2.5 font-bold text-lg sm:text-xl tracking-tight text-slate-900 group shrink-0">
          <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-black shadow-sm group-hover:bg-indigo-700 transition-colors">
            CS
          </span>
          <span>ClipShrink</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Compressor
          </Link>
          <Link
            href="/convert"
            className="hover:text-slate-900 transition-colors">
            Converter
          </Link>
          <Link
            href="/trim-video"
            className="hover:text-slate-900 transition-colors">
            Trimmer
          </Link>
          <Link
            href="/remove-audio"
            className="hover:text-slate-900 transition-colors">
            Muter
          </Link>
          <Link
            href="/extract-audio"
            className="hover:text-slate-900 transition-colors">
            Extract Audio
          </Link>
          <Link
            href="/about"
            className="hover:text-slate-900 transition-colors text-slate-400">
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
        <div className="md:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-1.5 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 px-3 pb-1">
            Video Utilities
          </div>

          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors">
            <Video className="w-4 h-4 text-indigo-600" />
            <span>Video Compressor</span>
          </Link>

          <Link
            href="/convert"
            onClick={closeMenu}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors">
            <RefreshCw className="w-4 h-4 text-indigo-600" />
            <span>Video Converter</span>
          </Link>

          <Link
            href="/trim-video"
            onClick={closeMenu}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors">
            <Scissors className="w-4 h-4 text-indigo-600" />
            <span>Lossless Video Trimmer</span>
          </Link>

          <Link
            href="/remove-audio"
            onClick={closeMenu}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors">
            <VolumeX className="w-4 h-4 text-indigo-600" />
            <span>Remove Audio (Muter)</span>
          </Link>

          <Link
            href="/extract-audio"
            onClick={closeMenu}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors">
            <Headphones className="w-4 h-4 text-indigo-600" />
            <span>Extract Audio (MP3/WAV)</span>
          </Link>

          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/about"
              onClick={closeMenu}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
              <Info className="w-3.5 h-3.5" />
              <span>About ClipShrink</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
