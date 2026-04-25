/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        display: ['Inter', 'sans-serif'],
      },
      colors: {
        // Brand palette per AGENTS.md
        primary: {
          DEFAULT: '#1565D8',
          50: '#EFF5FE',
          100: '#DCE9FC',
          500: '#1565D8',
          600: '#1057C2',
          700: '#0C46A0',
        },
        navy: {
          DEFAULT: '#0F172A',
        },
        surface: {
          DEFAULT: '#F8FAFC',
          hover: '#F1F5F9',
        },
        brandBorder: {
          DEFAULT: '#E2E8F0',
        },
        muted: {
          DEFAULT: '#475569',
          weak: '#64748B',
          disabled: '#CBD5E1',
        },
        success: { DEFAULT: '#16A34A' },
        warning: { DEFAULT: '#F59E0B' },
        danger: { DEFAULT: '#DC2626' },
        info: { DEFAULT: '#2563EB' },
        secondary: {
          DEFAULT: '#10B981',
        },
        light: {
          DEFAULT: '#FFFFFF',
        },
      },
      borderRadius: {
        12: '12px',
        16: '16px',
      },
      boxShadow: {
        soft: '0 4px 12px rgba(15, 23, 42, 0.06)',
        elevated: '0 8px 24px rgba(15, 23, 42, 0.10)',
      },
      spacing: {
        sidebar: '280px',
        topnav: '72px',
      },
      screens: {
        tablet: '640px',
        laptop: '1024px',
        desktop: '1280px',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@tailwindcss/forms'),
  ],
};
