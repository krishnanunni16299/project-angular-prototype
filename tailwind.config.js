/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "crt-green": "#41C347",
        "crt-cyan": "#50D8D5",
        "crt-gray": "#A7A7A7",
        "crt-dark": "#2a2a2a",
      },
      fontFamily: {
        mono: ["IBM Plex Mono", "monospace"],
      },
      animation: {
        flicker: "flicker 0.2s infinite",
        blink: "blink 1s infinite",
      },
      keyframes: {
        flicker: {
          "0%": { opacity: "0.97" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0.97" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      boxShadow: {
        "crt-inset":
          "inset 0 0 50px rgba(65, 195, 71, 0.05), 0 0 80px rgba(65, 195, 71, 0.1), 0 0 5px #000",
        "crt-glow-green": "0 0 2px #41C347",
        "crt-glow-cyan": "0 0 2px #50D8D5",
        "crt-glow-gray": "0 0 2px #A7A7A7",
        "crt-glow-white": "0 0 2px white",
        "crt-glow-green-strong": "0 0 3px #41C347, 0 0 6px #41C347",
        "crt-glow-gray-strong":
          "0 0 4px #A7A7A7, 0 0 8px #A7A7A7, 0 0 12px #A7A7A7",
      },
    },
  },
  plugins: [],
};
