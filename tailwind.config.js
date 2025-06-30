/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./_site/**/*.html",      // HTML generado por Jekyll
    "./*.html",               // archivos en la raíz
    "./*.md",               // archivos en la raíz
    "./_includes/**/*.html",  // includes de Jekyll
    "./_layouts/**/*.html",   // layouts de Jekyll
    "./_posts/**/*.md",       // posts de Jekyll
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
