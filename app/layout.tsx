import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Amit Mishra | Software Developer & Data Analyst',
  description: 'Premium portfolio of Amit Mishra - Software Developer & Data Analyst. Turning complex data into scalable, real-world solutions.',
  generator: 'v0.app',
  keywords: ['Software Developer', 'Data Analyst', 'Python', 'React', 'Machine Learning', 'Portfolio'],
  authors: [{ name: 'Amit Mishra' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://amitmishra.dev', // Replace with actual domain later
    siteName: 'Amit Mishra Portfolio',
    title: 'Amit Mishra | Software Developer & Data Analyst',
    description: 'Premium portfolio of Amit Mishra - Software Developer & Data Analyst. Turning complex data into scalable, real-world solutions.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Amit Mishra - Portfolio',
      },
    ],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-[#050816]">
      <body className={`${inter.variable} font-sans antialiased transition-colors duration-300`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
