/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          300: '#D2B48C', // light brown
          700: '#8B4513', // dark brown
        },
        yellow: {
          300: '#FFFFE0', // light yellow
          700: '#FFD700', // dark sand color
        },
      },
    },
  },
  plugins: [],
}

