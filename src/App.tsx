import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <HomePage />
    </QueryClientProvider>
  );
}

export default App;
