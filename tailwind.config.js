/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0A0A0F',
          secondary: '#0D0D14',
          tertiary: '#141419',
          elevated: '#1A1A22',
        },
        text: {
          primary: '#FFF7DF',
          secondary: '#B8B8B8',
          muted: '#9299A1',
        },
        accent: {
          pink: '#FF3CAC',
          blue: '#0033FF',
          lime: '#CCFF00',
          lavender: '#9E9EFF',
          purple: '#695CFF',
        },
        border: {
          default: 'rgba(255,255,255,0.08)',
          hover: 'rgba(255,255,255,0.15)',
        },
      },
      fontFamily: {
        display: ['"Arial Black"', 'Impact', 'sans-serif'],
        body: ['Rubik', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        'card': '20px',
      },
    },
  },
  plugins: [],
}
