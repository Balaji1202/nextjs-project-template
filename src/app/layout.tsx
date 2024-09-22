import React from 'react';

export const metadata = {
  title: 'My Next.js App',
  description: 'Created with manual setup',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
