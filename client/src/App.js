import Home from "./pages/Home";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToggleProvider } from "./context/ToggleSideBarContext";
import Clients from "./components/Clients";
import Projects from "./components/Projects";
import ClientDetailsPage from "./components/ClientDetailsPage";
import Login from "./components/Login";
import Register from "./components/Register";
import { useContext} from "react";
import Cookies from "universal-cookie";
import { AuthContext, AuthContextProvider } from "./lib/AuthContext";
import PrivateRoute from "./lib/PrivateRoutes";

const httpLink = new HttpLink({ uri: `${process.env.REACT_APP_API_URL}` });

const authLink = new ApolloLink((operation, forward) => {
  const cookie = new Cookies();
  const token = cookie.get("authToken");

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

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
  link: authLink.concat(httpLink),
  cache: cache,
});

function App() {
  const { auth } = useContext(AuthContext);
  const cookie = new Cookies();
  const authToken = cookie.get("authToken", { path: "/" });

  return (
    <>
      <ApolloProvider client={client}>
        <AuthContextProvider>
          <ToggleProvider>
            <Router>
              <Routes>
                <Route path="/" element={<PrivateRoute Component={Home} />} />

                <Route
                  path="/projects"
                  element={<PrivateRoute Component={Projects} />}
                />
                <Route
                  path="/clients"
                  element={<PrivateRoute Component={Clients} />}
                />
                <Route
                  path="/projects/:id"
                  element={<PrivateRoute Component={Project} />}
                />
                <Route
                  path="/clients/:id"
                  element={<PrivateRoute Component={ClientDetailsPage} />}
                />
                <Route
                  path="/project"
                  element={<PrivateRoute Component={Project} />}
                />

                <Route path="*" element={<NotFound />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </Router>
          </ToggleProvider>
        </AuthContextProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
