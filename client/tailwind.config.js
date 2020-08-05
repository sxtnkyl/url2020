module.exports = {
  purge: [],
  theme: {
    container: {
      center: true,
      display: "grid",
      placeItems: "center",
    },
    zIndex: {
      "-10": "-10",
    },
    extend: {
      gridTemplateColumns: {
        iconBtn: "minmax(50px, 25%) 1fr",
      },
      width: {
        char: "30ch",
      },
    },
  },
  variants: {
    stroke: ["responsive", "focus"],
  },
  plugins: [],
};
