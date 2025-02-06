import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <Toaster />
      </ApolloProvider>
    </Provider>
  </StrictMode>
);
