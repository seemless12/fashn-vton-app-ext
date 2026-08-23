/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
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
        }
      },
    },
  },
  plugins: [],
}
