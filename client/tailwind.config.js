/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vbrion: {
          bg: "#0A1120",
          surface: "#101A2E",
          surfaceHover: "#14213A",
          surfaceBorder: "rgba(255, 255, 255, 0.08)",
          cyan: "#00D4FF",
          azure: "#1AA3E0",
          deep: "#0B4C7A",
          textHead: "#FFFFFF",
          textBody: "#C9D3E3",
          textMuted: "#8B97AD",
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        'vbrion-gradient': 'linear-gradient(135deg, #00D4FF 0%, #1AA3E0 50%, #0B4C7A 100%)',
        'vbrion-gradient-subtle': 'linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(26, 163, 224, 0.08) 50%, rgba(11, 76, 122, 0.05) 100%)',
        'vbrion-glow-radial': 'radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.12) 0%, transparent 70%)',
      },
      boxShadow: {
        'cyan-glow': '0 0 25px -5px rgba(0, 212, 255, 0.35)',
        'cyan-glow-lg': '0 0 50px -10px rgba(0, 212, 255, 0.45)',
        'azure-glow': '0 0 30px -5px rgba(26, 163, 224, 0.3)',
        'card-elevated': '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.06)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
