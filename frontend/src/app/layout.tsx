import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KineticFlow | Reaction Kinetics Simulator',
  description: 'Interactive educational tool for visualizing chemical reaction rates and collision theory.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <div className="min-h-screen flex flex-col">
          {/* Simple Navbar */}
          <header className="border-b border-slate-200 bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">K</div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900">KineticFlow</h1>
              </div>
              <nav className="text-sm font-medium text-slate-500">
                Kinetics Lab v1.0
              </nav>
            </div>
          </header>

          <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
