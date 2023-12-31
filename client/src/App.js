import React from "react";
import Header from "./components/Header";
import Clients from "./components/Clients";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import AddClientModal from "./components/AddClientModal";


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
        <Header />
        <div className="container">
          <AddClientModal />
          <Clients />
        </div>
      </ApolloProvider>
    </>

  );
}

export default App;
