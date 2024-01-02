import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import Home from "./pages/Home";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";

import Header from "./components/Header";

const port = 8080;

const cache = new InMemoryCache({
  typePolicies: { // handle merge of incoming data with existing data (ex: when adding a new client, we want to merge the new client with the existing clients)
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
      projects: {
        merge(existing, incoming) {
          return incoming;
        },
      },
    },
  }
}
);

const client = new ApolloClient({ uri: `http://localhost:${port}/graphql`, cache });

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container">
           <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:id" element={<Project/>} />
            <Route path='*' element={<NotFound />} />
           </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>

  );
}

export default App;
