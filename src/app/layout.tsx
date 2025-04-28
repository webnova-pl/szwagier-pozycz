import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/ui/organisms/Header";
import Footer from "@/ui/organisms/Footer";
import { AOSInit } from "@/plugins/aos";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Szwagier Pożycz | Wypożyczalnia sprzętu budowlanego i ogrodowego",
  description:
    "Szwagier pozycz to profesjonalna wypożyczalnia sprzętu budowlanego, ogrodowego i domowego. Wypożycz narzędzia i urządzenia w atrakcyjnych cenach w Rzeszowie.",
  keywords:
    "wypożyczalnia sprzętu, wypożycz narzędzia, wynajem sprzętu budowlanego, wypożyczalnia elektronarzędzi, sprzęt ogrodowy wynajem",
  alternates: {
    canonical: "https://szwagierpozycz.pl",
  },
  openGraph: {
    title: "Szwagier pozycz | Wypożyczalnia sprzętu",
    description:
      "Profesjonalna wypożyczalnia sprzętu budowlanego, ogrodowego i domowego w atrakcyjnych cenach.",
    url: "https://szwagierpozycz.pl",
    siteName: "Szwagier Pożycz",
    locale: "pl_PL",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification-code",
  },
  category: "equipment rental",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="overflow-x-hidden">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="author" content="Szwagier Pożycz" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </head>
      <AOSInit />
      <body
        className={`${montserrat.className} antialiased overflow-x-hidden `}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
