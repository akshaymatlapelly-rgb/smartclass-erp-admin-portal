/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy-purple': '#0a0b1a',
        'navy-purple-light': '#1a0533',
        'neon-purple': '#8b5cf6',
        'neon-blue': '#3bb2ff',
        'neon-green': '#34d399',
        'neon-amber': '#fbbf24',
        'neon-pink': '#ec4899',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(to bottom right, #0a0b1a, #1a0533)',
      }
    },
  },
  plugins: [],
}
