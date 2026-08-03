/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Olivia', 'Cormorant Garamond', 'EB Garamond', 'Playfair Display', 'serif'],
      },
      colors: {
        'brand-cyan': '#00F0FF',
      },
    },
  },
  plugins: [],
}
