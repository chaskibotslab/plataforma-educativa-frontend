/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'chaski-blue': '#3B82F6',
        'chaski-purple': '#8B5CF6',
        'chaski-green': '#10B981',
        'chaski-red': '#EF4444'
      }
    },
  },
  plugins: [],
}
