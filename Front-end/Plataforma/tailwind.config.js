/** @type {import('tailwindcss').Config} */
import scrollbar from 'tailwind-scrollbar';


export default {
  prefix: 'tw-',  // Adiciona o prefixo 'tw-' a todas as classes,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
    },
  },
  plugins: [
    scrollbar,
  ],
}
