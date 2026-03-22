/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./assets/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'Menlo', 'monospace'],
      },
      colors: {
        white: '#FFFFFF',
        'off-white': '#F8F6F2',
        dark: '#1A1A1A',
        green: {
          100: '#E8F2EC',
          500: '#4A8C6E',
          700: '#2D5A45',
          900: '#1B3A2D',
        },
        teal: {
          100: '#E6F7F8',
          500: '#14A8AC',
          700: '#0D7377',
        },
        amber: {
          500: '#F5A623',
        },
        gray: {
          400: '#999999',
          500: '#666666',
          600: '#4B4B4B',
        },
        error: '#D32F2F',
      },
      spacing: {
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '40px',
        xl: '64px',
        '2xl': '96px',
        '3xl': '128px',
      },
      borderRadius: {
        DEFAULT: '12px',
        pill: '9999px',
        lg: '16px',
      },
      boxShadow: {
        light: '0 2px 8px rgba(0,0,0,0.06)',
        medium: '0 8px 32px rgba(0,0,0,0.10)',
        'cta-hover': '0 16px 40px rgba(45,90,69,0.25)',
        'cta-hover-teal': '0 16px 40px rgba(13,115,119,0.25)',
      },
      fontSize: {
        'hero-desktop': ['52px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'hero-mobile': ['34px', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'hero-xs': ['28px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2-desktop': ['36px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2-mobile': ['26px', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h3': ['22px', { lineHeight: '1.35', fontWeight: '600' }],
        'h3-mobile': ['18px', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['17px', { lineHeight: '1.65' }],
        'body-mobile': ['15px', { lineHeight: '1.65' }],
        'caption': ['13px', { lineHeight: '1.5', fontWeight: '500' }],
        'caption-mobile': ['12px', { lineHeight: '1.5', fontWeight: '500' }],
        'metric-desktop': ['48px', { lineHeight: '1', fontWeight: '700' }],
        'metric-mobile': ['36px', { lineHeight: '1', fontWeight: '700' }],
        'cta': ['16px', { fontWeight: '700' }],
        'cta-mobile': ['15px', { fontWeight: '700' }],
      },
      maxWidth: {
        container: '1200px',
      },
      animation: {
        'slide-up': 'slideUp 400ms cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in': 'fadeIn 400ms cubic-bezier(0.16,1,0.3,1) forwards',
        'marquee': 'marquee 30s linear infinite',
        'spin-slow': 'spin 1.2s linear infinite',
        'draw': 'draw 600ms ease forwards',
      },
      keyframes: {
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        draw: {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
}
