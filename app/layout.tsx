import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KARMA Dragon Fruit Farms",
  description: "Investor-ready dashboard for KARMA Dragon Fruit Farms, showcasing farm operations, investment tracking, and buyer negotiation metrics.",
  keywords: ["dragon fruit", "farm dashboard", "agriculture finance", "investor dashboard", "KARMA"],
  openGraph: {
    title: "KARMA Dragon Fruit Farms",
    description: "Investor-ready dashboard for KARMA Dragon Fruit Farms",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[linear-gradient(135deg,_#fefdf7_0%,_#eefbf4_100%)] text-forest-green">
        <div className="relative flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
