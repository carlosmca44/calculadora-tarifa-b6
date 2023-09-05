import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MiPagoB6',
  description: 'Calculadora para el consumo electrico bajo la combinacion de la tarifa residencial y no residencial (tarifa B-6)',
  creator: 'Carlos Manuel Crespo Astorac',
  keywords: ['tarifa b6', 'b6', 'tarifa electrica en cuba'],
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
