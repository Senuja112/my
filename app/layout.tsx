import type { Metadata } from 'next';
import './globals.css';
import { ReactLenis } from 'lenis/react';

export const metadata: Metadata = {
  title: 'Induwara Hasaranga | AI & ML Engineer',
  description: 'A professional portfolio for AI, machine learning, full-stack development, and modern web design.',
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
