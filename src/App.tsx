import { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import OrderForm from "./components/orderForm";
import "./App.css";

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <OrderForm />
      </div>
    </QueryClientProvider>
  );
};

export default App;
