import scrollbar from 'tailwind-scrollbar';

export default {
  prefix: 'tw-',  // Adiciona o prefixo 'tw-' a todas as classes,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    scrollbar,
  ],
}