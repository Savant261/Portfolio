import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Vend Sans"', '"DM Sans"', 'sans-serif'],
        display: ['Quantico', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        background: 'var(--bg)',
        'bg-card': 'var(--bg-card)',
        'bg-card-hover': 'var(--bg-card-hover)',
        orange: 'var(--orange)',
        'orange-dim': 'var(--orange-dim)',
        white: 'var(--white)',
        'white-dim': 'var(--white-dim)',
        border: 'var(--border)',
      }
    },
  },
  plugins: [],
} satisfies Config
