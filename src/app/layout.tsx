import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { CasesProvider } from "@/context/CasesContext";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SkinSight AI — Dermatology Triage Platform",
  description:
    "AI-assisted dermatology triage for clinicians. Prioritize lesion cases, review explainable ABCDE signals, and keep final decisions in human hands.",
  openGraph: {
    title: "SkinSight AI — Dermatology Triage Platform",
    description:
      "AI-assisted dermatology triage for clinicians who need speed without losing judgment.",
    images: [{ url: "/marketing/og-banner.png", width: 1376, height: 768 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SkinSight AI — Dermatology Triage Platform",
    description:
      "AI-assisted dermatology triage for clinicians who need speed without losing judgment.",
    images: ["/marketing/og-banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full bg-background font-sans text-foreground">
        <CasesProvider>{children}</CasesProvider>
      </body>
    </html>
  );
}
