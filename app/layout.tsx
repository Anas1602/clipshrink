import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://clipshrink.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-950 text-slate-100 antialiased`}>
        {/* Google Analytics 4 Scripts */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-42HGTD9K87"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-42HGTD9K87');
          `}
        </Script>

        {/* Navigation Bar */}
        <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-extrabold text-xl tracking-tight text-white group">
              <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-black shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
                CS
              </span>
              ClipShrink
            </Link>
            <nav className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300">
              <Link href="/" className="hover:text-white transition-colors">
                Compressor
              </Link>
              <Link
                href="/convert"
                className="hover:text-white transition-colors">
                Converter
              </Link>
              <Link
                href="/remove-audio"
                className="hover:text-white transition-colors flex items-center gap-1.5">
                Mute Video
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-600/30 text-indigo-300 border border-indigo-500/30">
                  NEW
                </span>
              </Link>
              <Link
                href="/about"
                className="hover:text-white transition-colors hidden sm:inline">
                About
              </Link>
            </nav>
          </div>
        </header>

        {children}

        {/* Cookie Consent Banner */}
        <CookieConsent />

        {/* Footer */}
        <footer className="border-t border-slate-900 bg-slate-950 py-12 text-center text-xs text-slate-400">
          <div className="max-w-6xl mx-auto px-4 space-y-4">
            <div className="flex flex-wrap justify-center gap-6 text-slate-300">
              <Link href="/" className="hover:underline">
                Video Compressor
              </Link>
              <Link href="/convert" className="hover:underline">
                Video Converter
              </Link>
              <Link href="/remove-audio" className="hover:underline">
                Remove Audio
              </Link>
              <Link href="/about" className="hover:underline">
                About ClipShrink
              </Link>
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:underline">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </div>
            <p>
              © {new Date().getFullYear()} ClipShrink. All rights reserved.
              Video files are processed 100% locally in your browser.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
