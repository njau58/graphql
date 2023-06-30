
import Home from "./pages/Home";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToggleProvider } from "./context/ToggleSideBarContext";
import Clients from "./components/Clients";
import Projects from "./components/Projects";
import ClientDetailsPage from "./components/ClientDetailsPage";

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
        <ToggleProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects/>} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path="/clients/:id" element={<ClientDetailsPage/>}/>
              <Route path="/project" element={<Project />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ToggleProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
