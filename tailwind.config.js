/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0A0A0A',
        secondary: '#111111',
        border: '#1A1A1A',
        textprimary: '#F4F4F4',
        muted: '#8C8C8C',
        accent: '#D32F2F',
        wa: '#25D366',
      },
      fontFamily: {
        mono: ['"Space Mono"', '"Roboto Mono"', 'monospace'],
        display: ['Anton', '"Archivo Black"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
