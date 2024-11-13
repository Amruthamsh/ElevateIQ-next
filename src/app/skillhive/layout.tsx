'use client'; // Add this directive at the top


import * as React from 'react';
import { Inter } from 'next/font/google';
import { CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../../createEmotionCache';
import '../globals.css'; // Import your global CSS

const clientSideEmotionCache = createEmotionCache();

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body className={inter.className}>
        <CacheProvider value={clientSideEmotionCache}>
          <CssBaseline /> {/* Material-UI baseline reset */}
          {children}
        </CacheProvider>
      </body>
    </html>
  );
}
