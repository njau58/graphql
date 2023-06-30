const express = require("express");
require("dotenv").config();
const port = process.env.PORT;
const colors = require("colors");
const schema = require("./schema/schema"); //graphql schema
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");

const { dbConnect } = require("./config/db");
const app = express();

//MongoDB connection
dbConnect();

app.use(cors());

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
