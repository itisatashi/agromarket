/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50', // Fresh Green
        secondary: '#8D6E63', // Earthy Brown
        accent: '#FF9800', // Warm Orange
        background: '#F5F5F5', // Off-white
        text: {
          primary: '#2D3748', // Dark Gray
          secondary: '#4A5568', // Medium Gray
          light: '#A0AEC0', // Light Gray
        }
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
