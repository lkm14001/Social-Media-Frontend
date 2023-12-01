import {
  PaletteMode,
  createTheme,
} from "@mui/material";

// Module Augmentation - for adding user defined theming variables

declare module "@mui/material/styles" {
  // interface Theme {

  // }
  // // allows configuration for createTheme Function
  // interface ThemeOptions {

  // }

  interface PaletteOptions {
    border?: {
      color?: string;
    };
    field?: {
      background?: string;
      textColor?: string;
    };
  }
  interface TypeBackground {
    mode: string;
    widget?: string;
  }
  // interface TypographyStyleOptions{
  //   color:string;
  // }
  // interface Palette
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    postButton: true;
  }
}

export const getDesignTokens = (mode: PaletteMode) => {
  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            background: {
              mode: "#000000",
              widget: "#1b1b1f",
            },
          }
        : {
            background: {
              mode: "#f0f0f0",
            },
          }),
      ...(mode === "dark"
        ? {
            border: {
              color: "white",
            },
          }
        : {
            border: {
              color: "black",
            },
          }),
      ...(mode === "dark"
        ? {
            field: {
              background: "#0f0f11",
              textColor: "#ffffff",
            },
          }
        : {
            field: {
              background: "#f0f0f0",
              textColor: "#323648",
            },
          }),
    },
    typography: {
      subtitle2: {
        color: mode === "dark" ? "#999999" : "#606060",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: "#6b6b6b #2b2b2b",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              backgroundColor: "#2b2b2b",
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 8,
              backgroundColor: "#6b6b6b",
              minHeight: 24,
              border: "3px solid #2b2b2b",
            },
            "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
              {
                backgroundColor: "#959595",
              },
            "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
              {
                backgroundColor: "#959595",
              },
            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
              {
                backgroundColor: "#959595",
              },
            "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
              backgroundColor: "#2b2b2b",
            },
          },
        },
      },
      MuiButton: {
        variants: [
          {
            props: { variant: "postButton",size:'large' },
            style: {
              backgroundColor: mode === 'dark' ? "#0f0f11" : "#f0f0f0",
              color: mode === 'dark' ? "#ffffff" : "#323648",
              fontWeight:'bolder',
              fontFamily: "Agbalumo",
              textTransform:"capitalize",
              "&:hover": {
                backgroundColor: mode === 'dark' ? "#0f0f11" : "#f0f0f0",
                color: mode === 'dark' ? "#ffffff" : "#323648",
                fontWeight: "bolder",
                fontFamily: "Agbalumo",
                
              },
            },
          },
        ],
      },
    },
  });

  return theme;
};
