import { fontFace, cssRule } from "typestyle";

fontFace({
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: 400,
    src: "local('Open Sans'), local('OpenSans'), "
        + "url('/static/fonts/OpenSans.woff2') format('woff2')",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, "
        + "U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000"
});

fontFace({
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: 600,
    src: "local('Open Sans Semibold'), local('OpenSans-Semibold'), "
        + "url('/static/fonts/OpenSans-Semibold.woff2') format('woff2')",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, "
        + "U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000"
});

cssRule("*", {
    padding: 0,
    margin: 0,
    boxSizing: "border-box",
    userSelect: "none",
    outline: 0
});

cssRule("html", {
    fontSize: 12,
    fontFamily: "'Open Sans', sans-serif",
    width: "100%",
    height: "100%"
});

cssRule("body", {
    userSelect: "none",
    width: "100%",
    height: "100%"
});

cssRule("#app", {
    width: "100%",
    height: "100%"
});

export const green = "#4caf50";
export const greenDark = "#388e3c";
export const greenLight = "#81c784";
export const red = "#d32f2f";
export const redDark = "#b71c1c";
export const redLight = "#f44336";
export const grey = "#9e9e9e";
export const greyDark = "#616161";
export const greyLight = "#e0e0e0";
export const black = "#212121";
export const white = "#ffffff";
export const appWidth = 800;
