import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import dotenv from 'dotenv';
import Home from "./pages/Home";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

dotenv.config();

const port = 8080;

const cache = new InMemoryCache({
  typePolicies: {
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
});

console.log(process.env.NODE_ENV);
console.log(process.env.MONGO_URI);
console.log(process.env.GRAPHQL_URI);

const client = new ApolloClient({ uri: process.env.GRAPHQL_URI || "https://project-mgmt-72ab7f289f44.herokuapp.com/graphql", cache });

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
