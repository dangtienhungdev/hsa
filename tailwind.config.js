/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        move: 'move 5s linear infinite',
      },
      keyframes: {
        move: {
          '0%': { transform: 'translateX(-200px)' },
          '100%': { transform: 'translateX(200px)' },
        },
      },
      colors: [
        {
          gray: {
            secondary: '#EFF2F5',
          },
        },
      ],
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
