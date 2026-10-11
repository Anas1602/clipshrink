"use client";

import React, { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck } from "lucide-react";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return localStorage.getItem("clipshrink_consent");
}

function getServerSnapshot() {
  return "pending"; // Server assumes pending to avoid hydration mismatch
}

export default function CookieConsent() {
  const consent = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [dismissed, setDismissed] = useState(false);

  // If already accepted/declined, or dismissed in current session, hide banner
  if (consent || dismissed) return null;

  const accept = () => {
    localStorage.setItem("clipshrink_consent", "granted");
    setDismissed(true);
  };

  const decline = () => {
    localStorage.setItem("clipshrink_consent", "declined");
    setDismissed(true);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-2xl shadow-black/80 backdrop-blur-2xl text-slate-300 space-y-3.5">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0 shadow-inner">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="text-xs sm:text-sm font-semibold text-white tracking-tight">
                Privacy & Performance
              </h4>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.2 rounded-md">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                100% Local RAM
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
              We use anonymous analytics to measure engine speed. Your video and
              audio files never leave your device. Read our{" "}
              <Link
                href="/privacy-policy"
                className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-800/60">
          <button
            type="button"
            onClick={decline}
            className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition-all cursor-pointer">
            Decline
          </button>
          <button
            type="button"
            onClick={accept}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all cursor-pointer">
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
