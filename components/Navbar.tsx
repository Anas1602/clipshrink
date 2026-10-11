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
    <header className="border-b border-slate-900 bg-slate-950/85 backdrop-blur-md sticky top-0 z-50 w-full">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-2.5 font-extrabold text-lg sm:text-xl tracking-tight text-white group shrink-0">
          <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-black shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
            CS
          </span>
          <span>ClipShrink</span>
        </Link>

        {/* Desktop Navigation (Hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <Link href="/" className="hover:text-white transition-colors">
            Compressor
          </Link>
          <Link href="/convert" className="hover:text-white transition-colors">
            Converter
          </Link>
          <Link
            href="/trim-video"
            className="hover:text-white transition-colors flex items-center gap-1.5">
            Trimmer
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-600/30 text-indigo-300 border border-indigo-500/30">
              NEW
            </span>
          </Link>
          <Link
            href="/remove-audio"
            className="hover:text-white transition-colors">
            Muter
          </Link>
          <Link
            href="/extract-audio"
            className="hover:text-white transition-colors">
            Extract Audio
          </Link>
          <Link
            href="/about"
            className="hover:text-white transition-colors text-slate-400">
            About
          </Link>
        </nav>

        {/* Mobile Hamburger Button (Visible only on mobile) */}
        <button
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors cursor-pointer">
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Slide-Down Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-4 py-4 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 px-3 pb-1">
            Video Utilities
          </div>

          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-900 transition-all">
            <Video className="w-4 h-4 text-indigo-400" />
            <span>Video Compressor</span>
          </Link>

          <Link
            href="/convert"
            onClick={closeMenu}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-900 transition-all">
            <RefreshCw className="w-4 h-4 text-indigo-400" />
            <span>Video Converter</span>
          </Link>

          <Link
            href="/trim-video"
            onClick={closeMenu}
            className="flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-900 transition-all">
            <div className="flex items-center gap-3">
              <Scissors className="w-4 h-4 text-indigo-400" />
              <span>Lossless Video Trimmer</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-600/30 text-indigo-300 border border-indigo-500/30">
              NEW
            </span>
          </Link>

          <Link
            href="/remove-audio"
            onClick={closeMenu}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-900 transition-all">
            <VolumeX className="w-4 h-4 text-indigo-400" />
            <span>Remove Audio (Muter)</span>
          </Link>

          <Link
            href="/extract-audio"
            onClick={closeMenu}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-900 transition-all">
            <Headphones className="w-4 h-4 text-indigo-400" />
            <span>Extract Audio (MP3/WAV)</span>
          </Link>

          <div className="pt-2 border-t border-slate-900">
            <Link
              href="/about"
              onClick={closeMenu}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-slate-400 hover:text-slate-200 transition-all">
              <Info className="w-3.5 h-3.5" />
              <span>About ClipShrink</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
