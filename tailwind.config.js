/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'hijau-muda': '#0FA588', // Menambahkan warna hijau muda
      },
    },
  },
  plugins: [],
};
