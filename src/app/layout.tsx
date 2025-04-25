import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/ui/organisms/Header";
import Footer from "@/ui/organisms/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat", // Zmieniono na właściwą nazwę
});

export const metadata: Metadata = {
  title: "Szwagier pozycz",
  description: "Szwagier pozycz",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
