const express = require("express");
require("dotenv").config();
const port = process.env.PORT;
const colors = require("colors");
const schema = require("./graphql/schema"); //graphql schema
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const http = require("http");
const { ApolloServer, gql } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { authenticate } = require("./middleware/auth");

const { dbConnect } = require("./config/db");
const app = express();

dbConnect();

app.use(authenticate);

app.use(cors());
app.use(express.json());

// const httpServer = http.createServer(app);

// const startApolloServer = async (app, httpServer) => {
//   const server = new ApolloServer({
//     schema,
//     plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//   });

//   await server.start();
//   server.applyMiddleware({ app});
// };
// startApolloServer(app, httpServer);

// module.exports = httpServer;
app.use(
  "/api",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

if(port){
  app.listen(port, ()=>console.log(`Server listening to port ${port}`))
}

module.exports = app;
