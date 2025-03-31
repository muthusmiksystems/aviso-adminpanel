module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        omnesarabic: ["OmnesArabic", "sans-serif"],
      },
      textColor: {
        primary: "#B82D97",
        secondary: "#525252",
        gray800: "#0D062D",
        black600: "#13131A",
        gray100: "#F5F5F5",
        gray200: "#78828A",
        "blue-100": "#29ABE2",
        // Ensure the color is added under 'colors'
      },
      backgroundImage: {
        backgroundpsuedo: "url('Images.Backgroundpsuedo')",
        "custom-gradient":
          "linear-gradient(to right, #B82D97, #57B3D3, #76ABFC)",
      },
      backgroundColor: {
        footerprimary: "#F9F9F9",
        buttonprimarypink: "#FF47ED",
        buttonsecondarypink: "#992B8E",
      },
    },
  },
  plugins: [],
};
