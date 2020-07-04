import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import { blue, orange } from "@material-ui/core/colors";

export const lightTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: blue,
      secondary: orange,
      type: "light",
      background: {
        default: "#f5f5f5"
      }
    }
  })
);
