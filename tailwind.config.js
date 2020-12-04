module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.svelte'],
  theme: {
    fontFamily: {
      'display': ['Bebas Neue'],
      'sans': ['Poppins', 'sans-serif'],
      'body': ['Poppins', 'sans-serif'],
    },
    extend: {
      height: {
        '100px': '100px',
        '200px': '200px',
        '300px': '300px',
        '400px': '400px',
        '500px': '500px'
      },
      gridTemplateColumns: {
        '3-2': '3fr 2fr'
      },
      gridTemplateRows: {
        "100px-1fr": "100px 1fr",
        '3-2': '3fr 2fr'
      }
    },
  },
  variants: {},
  plugins: [],
};