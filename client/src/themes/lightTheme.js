import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import { blue, orange } from "@material-ui/core/colors";

export const lightTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: blue,
      secondary: orange,
      type: "light",
      background: {
        default: "rgb(237, 241, 245)"
      }
    },
    overrides: {
      MuiAppBar: {
        root: {
          // background: "rgb(247, 254, 255)"
          // backgroundColor: blue[50]
        }
      },
      MuiPaper: {
        root: {
          // backgroundColor: blue[50]
        }
      },
      MuiDrawer: {
        paper: {
          // background: blue[50]
        }
      }
    },
    typography: {
      // fontFamily: "Open Sans, Roboto, sans-serif"
    }
  })
);
