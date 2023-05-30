const express = require('express')
require('dotenv').config()
const port = process.env.PORT 
const colors = require('colors')
const schema = require('./schema/schema')//graphql schema
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')


const { ApolloServer, gql } = require('apollo-server-express') ;

const {ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const http =require('http') 

const {dbConnect} =  require('./config/db')
const app = express()


//MongoDB connection
dbConnect()

app.use(cors())

const httpServer = http.createServer(app);
const startApolloServer = async(app, httpServer) => {
    const server = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
  
    await server.start();
    server.applyMiddleware({ app });
  }
  startApolloServer(app, httpServer);

  module.exports= httpServer;




