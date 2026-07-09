import type { Metadata } from "next";
import { absoluteUrl, defaultOgImage, defaultSeoDescription, defaultSeoTitle, siteName, siteUrl } from "@/data/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: defaultSeoTitle,
  description: defaultSeoDescription,
  keywords: [
    "tests virales",
    "mini tests",
    "quiz online",
    "test cultura general",
    "test futbol",
    "test personalidad",
    "test IQ rapido"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName,
    title: defaultSeoTitle,
    description: defaultSeoDescription,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: "ViralQuiz, mini tests virales rapidos y gratis"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSeoTitle,
    description: defaultSeoDescription,
    images: [defaultOgImage]
  },
  icons: {
    icon: "/icon.svg"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    inLanguage: "es"
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteName,
    url: siteUrl,
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Any",
    inLanguage: "es",
    description: defaultSeoDescription,
    image: absoluteUrl(defaultOgImage),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR"
    }
  }
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
