import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import CookieConsent from "@/components/CookieConsent";
import Navbar from "@/components/Navbar";
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
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${inter.className} bg-slate-950 text-slate-100 antialiased overflow-x-hidden min-h-screen flex flex-col`}>
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

        {/* Responsive Mobile / Desktop Navigation */}
        <Navbar />

        <div className="flex-1 w-full">{children}</div>

        {/* Cookie Consent Banner */}
        <CookieConsent />

        {/* Footer */}
        <footer className="border-t border-slate-900 bg-slate-950 py-12 text-center text-xs text-slate-400 w-full">
          <div className="max-w-6xl mx-auto px-4 space-y-4">
            <div className="flex flex-wrap justify-center gap-6 text-slate-300">
              <Link href="/" className="hover:underline">
                Video Compressor
              </Link>
              <Link href="/convert" className="hover:underline">
                Video Converter
              </Link>
              <Link href="/trim-video" className="hover:underline">
                Video Trimmer
              </Link>
              <Link href="/remove-audio" className="hover:underline">
                Remove Audio
              </Link>
              <Link href="/extract-audio" className="hover:underline">
                Extract Audio
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
