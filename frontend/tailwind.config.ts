import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          'electric': '#0066FF',
          'cyan': '#00D9FF',
          'dark': '#0F0F1E',
          'slate': '#1A1A2E',
          'accent': '#FF006E',
        }
      },
      backdropFilter: {
        'glass': 'backdrop-blur(10px)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [
    require('tailwindcss/plugin')(function({ addUtilities }) {
      addUtilities({
        '.glass': {
          '@apply bg-white/10 backdrop-blur-md border border-white/20': {},
        },
        '.glass-dark': {
          '@apply bg-slate-950/40 backdrop-blur-md border border-slate-800/50': {},
        }
      })
    })
  ],
}
export default config
