"use client";

import React, { useState, useSyncExternalStore } from "react";

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
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-2xl z-50 text-xs text-slate-300 space-y-3">
      <p>
        We use anonymous analytics to measure performance. Your video files
        never leave your device.
      </p>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={decline}
          className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors">
          Decline
        </button>
        <button
          type="button"
          onClick={accept}
          className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors">
          Accept
        </button>
      </div>
    </div>
  );
}
