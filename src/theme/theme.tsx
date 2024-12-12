import { blue, blueGrey, grey } from "@mui/material/colors";

const theme = {
  palette: {
    primary: blue,
  },
};

export const getDesignTokens = (mode: any) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: blue,
          divider: blue[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          primary: blueGrey,
          divider: blueGrey[700],
          background: {
            default: blueGrey[900],
            paper: blueGrey[900],
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
});

export default theme;