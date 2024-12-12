import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./pages/HomePage";
import Header from "./components/header/Header";
import {  useThemeContext } from "./theme/themeContextProvidder";
import { CssBaseline, ThemeProvider } from "@mui/material";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
    }
  }
});

const App = () => {
  const { theme } = useThemeContext();
  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Header />
        <HomePage />
    </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
