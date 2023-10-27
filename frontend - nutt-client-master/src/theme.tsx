import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        fontWeight: "semibold",
      },
    },
  },
  colors: {
    primary: {
      200: "#f4f9f3",
      300: "#d3ead0",
      400: "#b3d8ac",
      500: "#91c789",
      600: "#759f6d",
      700: "#577752",
      800: "#3a5137",
    },
    secondary: {
      200: "#fff3f3",
      300: "#ffd4ce",
      400: "#ffb3ab",
      500: "#ff9386",
      600: "#cd756b",
      700: "#995950",
      800: "#663b35",
    },
    accentYellow: {
      300: "#fefaef",
      400: "#ffecc2",
      500: "#fed885",
      600: "#998250",
      700: "#4d4129",
    },
    accentBlue: {
      300: "#f1f8fe",
      400: "#add9fe",
      500: "#76c0ff",
      600: "#5386b3",
      700: "#2e4c66",
    },
    accentPurple: {
      300: "#f6f5fa",
      400: "#c6c3de",
      500: "#9e9bc8",
      600: "#706d8c",
      700: "#3f3e50",
    },
    typography: {
      100: "#ffffff",
      200: "#6d726e",
      300: "#565b55",
      400: "#3e433d",
      500: "#0f140e",
    },
    grey: {
      200: "#f7f7f7",
      300: "#e8e8e8",
      400: "#d0d0d0",
      500: "#9fa19e",
      600: "#888a87",
      700: "#6d726e",
    },
  },
  fonts: {
    heading: `Pretendard, sans-serif`,
    body: `Pretendard, sans-serif`,
  },
});

export default theme;
