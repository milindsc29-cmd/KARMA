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
  title: "KARMA Organic & Dragon Fruit Farms",
  description: "Sustainable organic farming with dragon fruit cultivation. Join us in building the future of ethical agriculture.",
  keywords: ["organic farming", "dragon fruit", "sustainable agriculture", "ethical farming"],
  openGraph: {
    title: "KARMA Organic & Dragon Fruit Farms",
    description: "Sustainable organic farming with dragon fruit cultivation",
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
      <body className="min-h-full flex flex-col bg-cream text-forest-green">{children}</body>
    </html>
  );
}
