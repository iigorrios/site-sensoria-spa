import { Inter, Cormorant_Garamond } from 'next/font/google';

// Fallbacks livres, próximos das fontes da marca (Galano Classic / Alga).
// As fontes licenciadas assumem via @font-face quando os .woff2 forem adicionados.
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});
