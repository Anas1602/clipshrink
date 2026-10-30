import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import CookieConsent, {
  CookieSettingsButton,
} from "@/components/CookieConsent";
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
        className={`${inter.className} bg-slate-50 text-slate-900 antialiased overflow-x-hidden min-h-screen flex flex-col`}>
        {/* Google Analytics 4 with Consent Mode v2 */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied'
            });
            try {
              if (localStorage.getItem('clipshrink_consent') === 'granted') {
                gtag('consent', 'update', { analytics_storage: 'granted' });
              }
            } catch (e) {}
            gtag('js', new Date());
            gtag('config', 'G-42HGTD9K87');
          `}
        </Script>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-42HGTD9K87"
        />

        {/* Responsive Mobile / Desktop Navigation */}
        <Navbar />

        <div className="flex-1 w-full">{children}</div>

        {/* Cookie Consent Banner */}
        <CookieConsent />

        {/* Clean Light Footer */}
        <footer className="border-t border-slate-200 bg-white py-12 text-center text-xs text-slate-500 w-full">
          <div className="max-w-6xl mx-auto px-4 space-y-4">
            <div className="flex flex-wrap justify-center gap-6 text-slate-600 font-medium">
              <Link href="/" className="hover:text-slate-900 transition-colors">
                Video Compressor
              </Link>
              <Link
                href="/convert"
                className="hover:text-slate-900 transition-colors">
                Video Converter
              </Link>
              <Link
                href="/trim-video"
                className="hover:text-slate-900 transition-colors">
                Video Trimmer
              </Link>
              <Link
                href="/remove-audio"
                className="hover:text-slate-900 transition-colors">
                Remove Audio
              </Link>
              <Link
                href="/extract-audio"
                className="hover:text-slate-900 transition-colors">
                Extract Audio
              </Link>
              <Link
                href="/video-size-calculator"
                className="hover:text-slate-900 transition-colors">
                Video Size Calculator
              </Link>
              <Link
                href="/about"
                className="hover:text-slate-900 transition-colors">
                About ClipShrink
              </Link>
              <Link
                href="/privacy-policy"
                className="hover:text-slate-900 transition-colors">
                Privacy Policy
              </Link>
              <CookieSettingsButton />
              <Link
                href="/terms-of-service"
                className="hover:text-slate-900 transition-colors">
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="hover:text-slate-900 transition-colors">
                Contact
              </Link>
            </div>
            <p className="text-slate-400">
              © {new Date().getFullYear()} ClipShrink. All rights reserved.
              Video files are processed 100% locally in your browser.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
