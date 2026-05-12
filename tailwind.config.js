/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        aub:      { DEFAULT: '#1B1425', light: '#2A1F38' },
        cotton:   { DEFAULT: '#FAF5EF', dark: '#F0E8DD' },
        terra:    { DEFAULT: '#D4583B', light: '#FCEEE9', dark: '#B84430' },
        mehendi:  { DEFAULT: '#2D7A5F', light: '#E6F4EE' },
        haldi:    { DEFAULT: '#E8A849', light: '#FFF6E5', dark: '#C8912F' },
        ink:      '#1E1E2A',
        txt:      '#3D3543',
        muted:    '#8A7F93',
        lite:     '#B0A8B8',
        bdr:      { DEFAULT: '#E8E0D6', light: '#F2ECE4' },
        danger:   '#C9423F',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body:    ['DM Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-mic': 'pulseMic 0.8s infinite',
        'fade-up':   'fadeUp 0.25s ease',
      },
      keyframes: {
        pulseMic: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.12)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
