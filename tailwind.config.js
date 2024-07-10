/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#483bbf',
        secondary: '#bf8f3b',
        tertiary: '#866429',
        quaternary: '#2e3d86',
        quinary: '#d5dcff',
        text_primary: '#101415',

      },
    },
  },
  plugins: [],
}
