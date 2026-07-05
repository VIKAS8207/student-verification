/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4318FF',
        secondary: '#F4F7FE',
        textMain: '#2B3674',
        textMuted: '#A3AED0',
        success: '#05CD99',
        danger: '#EE5D50',
        pdfBg: '#E9E3FF',
      },
      boxShadow: {
        'edunut': '0px 18px 40px rgba(112, 144, 176, 0.12)',
        'edunutHover': '0px 20px 45px rgba(67, 24, 255, 0.15)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      }
    },
  },
  plugins: [],
}