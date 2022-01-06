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
        'background-light-hover': '#f3f3f3',
        'background-dark': '#555555',
      },
      flexBasis: {
        '1/14': '7.1428571%',
        '2/14': '14.2857143%',
        '12/14': '85.7142857%',
        '13/14': '92.8571428%',
      },
      boxShadow: {
        inner: 'inset -1px -1px 1px #FFFFFF, inset 1px 1px 2px rgba(174, 174, 192, 0.2)',
        outer: '-1px -1px 3px #FFFFFF, 1.5px 1.5px 3px rgba(174, 174, 192, 0.4)',
      },
      minWidth: {
        96: '24rem',
      },
    },
  },
  plugins: [],
}
