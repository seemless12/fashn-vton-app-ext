/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          deep: '#E95724',
          soft: '#FFF1EB',
          tint: '#FFF8F5',
        },
        dark: '#111111',
        text: {
          primary: '#171717',
          secondary: '#6B6B6B',
          muted: '#999999',
        },
        border: '#EAEAEA',
        surface: {
          DEFAULT: '#FFFFFF',
          alt: '#FAFAFA',
        },
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display-lg': ['3.75rem', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '800' }],
        'display': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '700' }],
        'subheading': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 16px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 24px rgba(0, 0, 0, 0.06)',
        'strong': '0 8px 40px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 40px rgba(255, 107, 53, 0.15)',
        'glow-lg': '0 0 60px rgba(255, 107, 53, 0.2)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 107, 53, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(255, 107, 53, 0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
