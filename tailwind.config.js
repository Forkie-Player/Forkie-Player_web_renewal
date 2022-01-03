module.exports = {
  content: ['./src/**/*.{ts,js,tsx,jsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        redrose: '#e81e25',
        'redrose-light': '#ff7075',
        'redrose-dark': '#d50909',
        blackberry: '#0e0301',
        'blackberry-light': '#555555',
        'blackberry-lightest': '#acabaf',
        'background-light': '#f9f9f9',
        'background-dark': '#555555',
      },
      flexBasis: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },
    },
  },
  plugins: [],
}
