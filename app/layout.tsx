import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./global.css";
import "./reset.css";

const inconsolata = Inconsolata({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Custom Audio Recorder",
  description: "A custom recording UI built around react-audio-voice-recorder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inconsolata.className}>{children}</body>
    </html>
  );
}
