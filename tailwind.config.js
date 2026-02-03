
module.exports = {
  content: [
    "./index.html",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        green: {
          950: '#052e16',
        },
      },
      fontFamily: {
        sans: ['Assistant', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
