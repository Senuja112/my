import type { Metadata } from 'next';
import './globals.css';
import { ReactLenis } from 'lenis/react';

export const metadata: Metadata = {
  metadataBase: new URL('https://induwarahasaranga.me'),
  title: {
    default: 'Induwara Hasaranga | AI & ML Engineer and Full Stack Developer',
    template: '%s | Induwara Hasaranga',
  },
  description:
    'Personal website and portfolio of Induwara Hasaranga, an AI & ML Engineer and Full Stack Developer from Colombo, Sri Lanka, building AI products, Sinhala chatbots, web platforms, and custom software systems.',
  keywords: [
    'Induwara Hasaranga',
    'AI Engineer Sri Lanka',
    'ML Engineer Sri Lanka',
    'Full Stack Developer Sri Lanka',
    'Software Engineer Colombo',
    'Next.js Developer',
    'React Developer',
    'Sinhala Chatbot Developer',
    'AI Chatbot Developer',
    'Qlony Girl',
    'Qlony Crypto AI',
    'Business Chatbot',
    'Web Developer Sri Lanka',
  ],
  authors: [{ name: 'Induwara Hasaranga', url: 'https://induwarahasaranga.me' }],
  creator: 'Induwara Hasaranga',
  publisher: 'Induwara Hasaranga',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://induwarahasaranga.me',
    siteName: 'Induwara Hasaranga',
    title: 'Induwara Hasaranga | AI & ML Engineer and Full Stack Developer',
    description:
      'Explore Induwara Hasaranga\'s portfolio of AI products, Sinhala chatbots, full-stack web platforms, and custom software systems.',
    images: [
      {
        url: '/projects/induwara.jpeg',
        width: 1200,
        height: 630,
        alt: 'Induwara Hasaranga',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Induwara Hasaranga | AI & ML Engineer and Full Stack Developer',
    description:
      'AI & ML Engineer and Full Stack Developer building AI products, Sinhala chatbots, web platforms, and custom software systems.',
    images: ['/projects/induwara.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactLenis root>
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
