/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Ajout de polices qui supportent mieux les caractères spéciaux
        'elegant': ['Cambria', 'Cochin', 'Georgia', 'Times', 'Times New Roman', 'serif'],
        'gothic': ['Palatino Linotype', 'Book Antiqua', 'Palatino', 'serif'],
        'royal': ['Didot', 'Bodoni', 'Garamond', 'Times New Roman', 'serif']
      },
      // Amélioration du rendu des caractères
      typography: {
        DEFAULT: {
          css: {
            fontVariantLigatures: 'contextual',
            fontFeatureSettings: '"liga", "clig", "calt"'
          }
        }
      }
    },
  },
  plugins: [],
};
