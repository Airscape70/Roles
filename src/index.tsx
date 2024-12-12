import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeContextProvider } from "./theme/themeContextProvidder";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </>
);
