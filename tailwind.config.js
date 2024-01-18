/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cabin: ["Cabin", "sans-serif"],
        inter: ['"Inter"', "sans-serif"],
      },
      colors: {
        blue_1: "#4889E9",
        blue_2: "#0075FF",
        blue_3: "#0063D7", //h1 tittle color
        blue_4: "rgba(0, 56, 255, 0.71)",
        blue_5: "#0041E7",

        purple_1: "#7743DB",
        purple_2: "#AE1D71",

        //yellow
        yellow_1: "#FAC337", //rating-color

        //green
        green_1: "rgba(213, 240, 209, 0.38)",
        green_2: "rgba(225, 240, 206, 0.58)",
        green_3: "rgba(12, 144, 0, 0.19)",
        //red
        red_1: "rgba(164, 0, 0, 0.07)",
        //text-color-base
        text_color_base: "rgba(52, 52, 52, 0.88)",
        text_color_2: "rgba(132, 132, 132, 0.88)",

        gray_1: "#E2E8F0",
        gray_2: "#dbdbdb",
        gray_3: "#939393",
        gray_4: "rgba(0, 0, 0, 0.30)", //border
        gray_5: "rgba(238, 238, 238, 0.47)", //bg-color
        gray_6: "rgba(232, 232, 232, 0.63)",
        gray_7: "#F8F8F8",
        gray_8: "#D0D5DD",
        gray_9: "rgba(0, 0, 0, 0.78)", //bg-color-gray
      },
    },
  },
  plugins: [],
};
