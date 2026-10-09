/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            deep: '#0a3d2e',
            DEFAULT: '#0d5940',
            medium: '#15803d',
            light: '#22c55e',
            lime: '#84cc16',
            pale: '#ecfdf5',
          },
          blue: {
            deep: '#1e3a8a',
            DEFAULT: '#1d4ed8',
            royal: '#2563eb',
            vibrant: '#0284c7',
            light: '#38bdf8',
            pale: '#eff6ff',
          },
        },
        apple: {
          bg: '#fbfbfd',
          surface: '#ffffff',
          secondary: '#f5f5f7',
          tertiary: '#e8e8ed',
          border: '#d2d2d7',
          text: {
            primary: '#1d1d1f',
            secondary: '#6e6e73',
            tertiary: '#86868b',
          }
        }
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Segoe UI"',
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif"
        ],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'apple-sm': '0 2px 8px -1px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)',
        'apple-card': '0 10px 30px -4px rgba(0, 0, 0, 0.06), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
        'apple-hover': '0 20px 40px -6px rgba(0, 0, 0, 0.1), 0 8px 20px -4px rgba(0, 0, 0, 0.04)',
        'apple-glass': '0 8px 32px 0 rgba(13, 89, 64, 0.08)',
      },
      borderRadius: {
        'apple-xl': '1.25rem',
        'apple-2xl': '1.75rem',
        'apple-3xl': '2.25rem',
      }
    },
  },
  plugins: [],
}

