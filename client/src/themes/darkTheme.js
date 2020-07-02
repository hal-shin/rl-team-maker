import {createMuiTheme, responsiveFontSizes} from "@material-ui/core";
import {blue, orange} from "@material-ui/core/colors";

export const darkTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: blue,
      secondary: orange,
      type: "dark"
    }
  })
);