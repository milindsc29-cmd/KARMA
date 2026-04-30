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
  title: "KARMA - KARMS Agricultural Platform",
  description: "KARMA powered by KARMS (Kissan Agro Reforms and Management Systems). Sustainable organic farming with dragon fruit cultivation.",
  keywords: ["organic farming", "dragon fruit", "sustainable agriculture", "KARMS", "Kissan Agro Reforms"],
  openGraph: {
    title: "KARMA - KARMS Agricultural Platform",
    description: "Sustainable organic farming with dragon fruit cultivation, powered by KARMS",
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
      <body 
        className="min-h-full flex flex-col bg-cream text-forest-green"
        style={{
          backgroundImage: 'url(/watermarked_img_11443283127393356644.png)',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex flex-col min-h-screen relative">
          {children}
        </div>
      </body>
    </html>
  );
}
