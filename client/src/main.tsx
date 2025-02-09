import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
        <Toaster />
      </ApolloProvider>
    </Provider>
  </StrictMode>
);
