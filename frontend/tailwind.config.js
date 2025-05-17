module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '425px',
        '2xs': '360px',
        '3xl': '1800px',
      },
      colors: {
        current: '#00000',
        white: '#FFFFFF',
        black: '#000000',
        primary: '#FFD354',
        primary_hover: '#FCDB7B',
        success: '#02AA7D',
        success_hover: '#3FCE8B',
        danger: '#E34444',
        danger_hover: '#E66D6D',
        darkDanger: '#dc0202',
        gray: '#363A45',
        gray_hover: '#525662',
        light_gray: '#CCCCCC',
        slate: '#e2e8f0',
        blue: '#006AEC',
        blue_hover: '#008aec',
        green: '#256d1f',
      },
      minHeight: {
        10: '2.5rem',
        12: '3rem',
        20: '5rem',
      },
    },
    maxWidth: {
      10: '350px',
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
