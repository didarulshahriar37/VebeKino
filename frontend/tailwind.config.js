/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui
  ],
  daisyui: {
    themes: [
      {
        ecommerce: {
          "primary": "#0066CC",      // Professional Blue - Main CTAs (Add to Cart, Buy Now)
          "secondary": "#A0A0A0",    // Neutral Gray - Secondary buttons, filters
          "accent": "#FF6B35",       // Vibrant Coral - Sales, promotions, alerts
          "neutral": "#F5F5F5",      // Light Background
          "base-100": "#FFFFFF",     // White background
          "base-200": "#F9F9F9",     // Subtle backgrounds
          "base-300": "#F0F0F0",     // Card backgrounds
          "info": "#0066CC",         // Info messages
          "success": "#22C55E",      // Success (order confirmed)
          "warning": "#F59E0B",      // Warnings (stock low)
          "error": "#EF4444",        // Errors (payment failed)
        }
      }
    ]
  }
}
