import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dark Step",
  description: "Interactive Web Based Multi-Instrument Step Sequencer Instrument",
  keywords: ["music", "sequencer", "step sequencer", "web audio", "synthesizer", "drum machine"],
  authors: [{ name: "Ziggy Baker", url: "https://ziggybaker.com" }],
  creator: "Ziggy Baker",
  publisher: "Ziggy Baker",
  
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#1C6758",
  icons: {
    icon: "./favicon.svg",
    apple: "./favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
