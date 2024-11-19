import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./pages/HomePage";
import Header from "./components/header/Header";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
    }
  }
});


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <HomePage />
    </QueryClientProvider>
  );
}

export default App;
