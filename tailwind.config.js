module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        aqua: '#00d4ff',
        'dark-blue': '#0a1a2e',
        'darker-blue': '#0a0e27',
        'accent-blue': '#0099cc',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
}
