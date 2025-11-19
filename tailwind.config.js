/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'crt-green': '#41C347',
        'crt-cyan': '#50D8D5',
        'crt-gray': '#A7A7A7',
        'crt-dark': '#2a2a2a',
      },
      fontFamily: {
        'mono': ['IBM 3270', 'monospace'],
      },
      animation: {
        'flicker': 'flicker 0.2s infinite',
        'blink': 'blink 1s infinite',
      },
      keyframes: {
        flicker: {
          '0%': { opacity: '0.97' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.97' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

