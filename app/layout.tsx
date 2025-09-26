import { Metadata } from 'next'
import './globals.css';
import Header from './components/sharedUi/Header';
import Footer from './components/sharedUi/Footer';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movie Addict',
  description: 'Discover and track your favorite movies with Movie Addict. Explore a vast collection, read reviews, and stay updated with the latest releases.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>
        <Header />
        <main className='container mx-auto px-4 py-8'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}