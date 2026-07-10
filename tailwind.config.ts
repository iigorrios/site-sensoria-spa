import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Sensória (Manual de Identidade Visual)
        sensoria: {
          green: '#5E7360', // Verde Sensória — âncora
          cream: '#FFF6C4', // Creme Natural — cor de ação / CTA
          mist: '#AEBCAF', // Verde Névoa — acento secundário
          fog: '#DBE0DA', // Névoa — fundos texturizados leves
          graphite: '#1E1E1E', // Grafite — texto/estrutura
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        // Definidas via next/font em src/app/layout base (variáveis CSS)
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Cormorant Garamond', 'ui-serif', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        display: '-0.02em',
        wide2: '0.14em',
        wide3: '0.22em',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};

export default config;
