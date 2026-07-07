import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ViralQuiz",
  description: "Mini-tests interactivos, visuales y virales."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
