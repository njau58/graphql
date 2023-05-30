import Header from "./components/Header";
import Home from "./pages/Home";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import {BrowserRouter as  Router, Route, Routes } from "react-router-dom";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
          projects: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
uri: `${process.env.REACT_APP_API_URL}`,
  cache: cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container  pt-5 pb-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
