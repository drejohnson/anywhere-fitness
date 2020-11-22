module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.svelte'],
  theme: {
    fontFamily: {
      'display': ['Bebas Neue'],
      'body': ['Poppins', 'sans-serif'],
    },
    extend: {
      gridTemplateColumns: {
        '3-2': '3fr 2fr'
      },
      gridTemplateRows: {
        '3-2': '3fr 2fr'
      }
    },
  },
  variants: {},
  plugins: [],
};