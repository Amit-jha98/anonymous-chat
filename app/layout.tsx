import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import "./globals.css";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ghostline-chat.onrender.com";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "Anonymous Chat Online | Random Stranger Text Chat",
    template: "%s | Ghostline Chat",
  },
  description:
    "Start an anonymous chat online with a random stranger. Ghostline is text-only, no signup, no database, no stored messages, and temporary in-memory sessions.",
  applicationName: "Ghostline Chat",
  manifest: "/site.webmanifest",
  keywords: [
    "anonymous chat",
    "anonymous chat online",
    "random chat",
    "stranger chat",
    "text chat",
    "no signup chat",
    "private chat",
    "temporary chat",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Anonymous Chat Online | Ghostline Chat",
    description:
      "Realtime anonymous stranger chat with no accounts, no database storage, and temporary text-only rooms.",
    url: "/",
    siteName: "Ghostline Chat",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ghostline Chat anonymous random text chat preview",
        type: "image/png",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anonymous Chat Online | Ghostline Chat",
    description:
      "Text-only random stranger chat with no signup and temporary in-memory sessions.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon.svg" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071013",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground font-body">
        {children}
        <Toaster position="top-center" richColors theme="dark" />
      </body>
    </html>
  );
}
