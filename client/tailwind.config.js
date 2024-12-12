/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      display: ['group-hover', 'group-focus'],
      colors: {
        primary: {
          DEFAULT: '#1E40AF', // Blue (Primary)
        },
        secondary: {
          DEFAULT: '#10B981', // Green (Secondary)
        },
        light: {
          DEFAULT: '#FFFFFF', // White (Least used)
        }
      },
      screens: {
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }

        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }

        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      }
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@tailwindcss/forms'),
    // ...
  ]
}