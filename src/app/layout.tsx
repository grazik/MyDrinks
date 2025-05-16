import type { Metadata } from "next";
import { Montserrat, Lato } from "next/font/google";
import "../styles/index.scss";
import { HeroBanner } from "@/componets/molecules/HeroBanner/HeroBanner";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-heading", // Define CSS variable name
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-body", // Define CSS variable name
});

export const metadata: Metadata = {
  title: "MyDrinks",
  description: "MyDrinks by Graziu. Webpage containing cocktails recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${montserrat.variable}`}>
        {children}
      </body>
    </html>
  );
}
