import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#0ea5e9',
}

export const metadata: Metadata = {
  title: 'Aguaviva - Recompensas',
  description: 'Sistema de fidelización para clientes de la planta potabilizadora.',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col items-center">
        <Navbar />
        <main className="flex-1 w-full flex flex-col items-center justify-center p-4 mt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
