import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
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
      <head>
        {/* Google Analytics 4 */}
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
      </head>
      <body
        className={`${inter.className} bg-slate-950 text-slate-100 antialiased`}>
        {/* Navigation Bar */}
        <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 font-extrabold text-xl tracking-tight text-white">
              <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-black shadow-lg shadow-indigo-600/30">
                CS
              </span>
              ClipShrink
            </Link>
            <nav className="flex items-center gap-6 text-xs sm:text-sm text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">
                Compressor
              </Link>
              <Link
                href="/about"
                className="hover:text-white transition-colors">
                About
              </Link>
              <Link
                href="/privacy-policy"
                className="hover:text-white transition-colors">
                Privacy
              </Link>
            </nav>
          </div>
        </header>

        {children}

        {/* Footer */}
        <footer className="border-t border-slate-900 bg-slate-950 py-12 text-center text-xs text-slate-500">
          <div className="max-w-6xl mx-auto px-4 space-y-4">
            <div className="flex flex-wrap justify-center gap-6 text-slate-400">
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
