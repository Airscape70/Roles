import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";

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
