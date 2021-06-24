import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ApolloClient from "apollo-boost";

export default App;

const client = new ApolloClient({
  uri: "http://localhost:4000",
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
