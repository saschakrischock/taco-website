export default {
  theme: {
    extend: {
      fontFamily: {
        mono: ['OCR-X'],
        headline: ['ABC Diatype'],
      },
      fontSize: {
        lg: ['0.938rem', {
          lineHeight: '1rem',
          letterSpacing: '0'
        }],
        xl: ['1.6rem', {
          lineHeight: '1.8rem',
          letterSpacing: '-0.03rem'
        }],
        'list-xl': ['1.25rem', {
          lineHeight: '1.4rem',
          letterSpacing: '-0.02rem'
        }],
        'mobile-xl': ['1.25rem', {
          lineHeight: '1.4rem',
          letterSpacing: '-0.02rem'
        }],
        '2xl': ['5rem', {
          lineHeight: '4.8rem',
          letterSpacing: '-0.15rem',
          fontWeight: 700
        }],
        'mobile-2xl': ['2.2rem', {
          lineHeight: '2.1rem',
          letterSpacing: '-0.02rem'
        }]
      }
    }
  }
}