module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  safelist: ['bg-blue-400', 'bg-yellow-700, bg-red-600'], // TODO remove this and use hex codes for custom colors
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      fontSize: {
        '2xs': '.65rem',
      },
      backgroundColor: ['checked'],
      minHeight: {
        full: '100vh',
      },
      scale: {
        1025: '1.025',
      },
      colors: {
        light: '#eee',
        lighterPurple: '#a2a2f5',
        lightPurple: '#6c6ca9',
        darkPurple: '#1B1043',
        purple: '#5936DE',
        blue: {
          400: '#0096FF',
          600: '#2565C7',
          700: '#1c4d97',
          800: '#14376c',
          900: '#09172e',
        },
        yellow: {
          700: '#ed8106',
        },
        red: {
          600: '#C9082A',
        },
        green: {
          600: 'rgb(27, 177, 82)',
        },
      },
    },
  },
  variants: {
    extend: { backgroundColor: ['even'], display: ['group-hover'] },
  },
  plugins: [],
};
