/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#58CC02',
          shade: '#48A800',
        },
        secondary: {
          DEFAULT: '#FF6B6B',
          shade: '#E63946',
        },
        success: {
          DEFAULT: '#06D6A0',
          shade: '#048A81',
        },
        warning: {
          DEFAULT: '#FFD166',
          shade: '#F0A500',
        },
        destructive: {
          DEFAULT: '#EF476F',
          shade: '#C1121F',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        }
      },
      fontFamily: {
        display: ['Baloo2'],
        body: ['Nunito'],
      }
    },
  },
  plugins: [],
}

