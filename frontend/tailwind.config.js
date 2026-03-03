/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#002FA7',
          hover: '#001F70',
          foreground: '#FFFFFF'
        },
        surface: {
          light: '#F5F5F7',
          dark: '#121212'
        },
        accent: {
          DEFAULT: '#004E64',
          light: '#E0F2F1'
        }
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    },
  },
  plugins: [],
}
