/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        pulsar: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.1' },
        },
      },
      animation: {
        pulsar: 'pulsar 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}