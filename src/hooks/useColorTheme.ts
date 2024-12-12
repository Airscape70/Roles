import React from "react";
import { createTheme } from "@mui/material";
import { getDesignTokens } from "../theme/theme";

export const useColorTheme = () => {
  const [mode, setMode] = React.useState<string>(() => {
    return localStorage.getItem("theme") || "light";
  });
  
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    localStorage.getItem(mode);
  };

  const modifiedTheme = React.useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode]
  );

  React.useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
  };
};
