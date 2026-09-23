import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import InquiryModal from "@/components/InquiryModal";

const playfair = localFont({
  src: "../../public/fonts/playfair-display-latin.woff2",
  variable: "--font-playfair",
  weight: "400 900",
  display: "swap",
});

const jakarta = localFont({
  src: "../../public/fonts/plus-jakarta-sans-latin.woff2",
  variable: "--font-jakarta",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bajwa Estate | Premium Real Estate",
  description: "Exclusive luxury real estate & architectural properties by Bajwa Estate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${playfair.variable} ${jakarta.variable}`}>
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <InquiryModal />
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
