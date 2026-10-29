"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck } from "lucide-react";

const CONSENT_KEY = "clipshrink_consent";
const CONSENT_EVENT = "clipshrink-consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Fallback for browsers where localStorage throws (some private modes)
let memoryChoice: string | null = null;

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CONSENT_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CONSENT_EVENT, callback);
  };
}

function getSnapshot() {
  try {
    return localStorage.getItem(CONSENT_KEY) ?? memoryChoice;
  } catch {
    return memoryChoice;
  }
}

function getServerSnapshot() {
  return "pending"; // Server assumes pending to avoid hydration mismatch
}

/**
 * Single place that records the visitor's choice AND tells Google Analytics.
 * value === null clears the choice (used by the footer "Cookie settings" link).
 */
function setConsent(value: "granted" | "declined" | null) {
  memoryChoice = value;
  try {
    if (value === null) localStorage.removeItem(CONSENT_KEY);
    else localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Ignore: memoryChoice keeps the banner state correct for this page view.
  }
  window.gtag?.("consent", "update", {
    analytics_storage: value === "granted" ? "granted" : "denied",
  });
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/** Footer link so a visitor can withdraw or change consent as easily as they gave it. */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => setConsent(null)}
      className="hover:underline cursor-pointer text-slate-600 hover:text-slate-900 transition-colors">
      Cookie settings
    </button>
  );
}

export default function CookieConsent() {
  const consent = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // Already accepted/declined (or server render): no banner.
  if (consent) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-300/40 text-slate-700 space-y-3.5">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="text-xs sm:text-sm font-semibold text-slate-900 tracking-tight">
                Privacy & Analytics
              </h4>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Files stay local
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
              We use Google Analytics to count visits. Accept lets it use
              cookies; Decline keeps it cookie-free. Your media files never
              leave your device either way. Read our{" "}
              <Link
                href="/privacy-policy"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2 transition-colors">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setConsent("declined")}
            className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer">
            Decline
          </button>
          <button
            type="button"
            onClick={() => setConsent("granted")}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition-colors cursor-pointer">
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
