module.exports = {
  content: ['./src/**/*.{ts,js,tsx,jsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'primary-yellow': '#ffd169',
        'primary-resrose': '#d50909',
        blackberry: '#1d1d1d',
        'blackberry-light': '#757575',
        'blackberry-lightest': '#aeaeae',
        'background-light': '#f9f9f9',
        'background-light-hover': '#f3f3f3',
        'background-dark': '#757575',
        error: '#E81E25',
      },
      flexBasis: {
        '1/14': '7.1428571%',
        '2/14': '14.2857143%',
        '12/14': '85.7142857%',
        '13/14': '92.8571428%',
      },
      boxShadow: {
        inner: 'inset -1px -1px 1px #FFFFFF, inset 1px 1px 2px  rgba(174, 174, 192, 0.2) ',
        outer: '-1px -1px 3px #FFFFFF, 1.5px 1.5px 3px  rgba(174, 174, 192, 0.4) ',
      },
      width: {
        '2/5': '40%',
        '2/4': '50%',
        '2/3': '66%',
        '1/2': '50%',
      },
      minWidth: {
        96: '24rem',
      },
      screens: {
        '3xl': '1920px',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
  important: true,
}

/**
 * rgba(174, 174, 192, 0.2)
 * rgba(174, 174, 192, 0.4)
 */
