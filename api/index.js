const express = require("express");
require("dotenv").config();
const port = process.env.PORT;
const colors = require("colors");
const schema = require("./graphql/schema"); //graphql schema
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");

const { dbConnect } = require("./config/db");
const app = express();
const {authenticate} = require('./middleware/auth')

//MongoDB connection
dbConnect();

app.use(authenticate)

app.use(cors());

// app.use(authenticate)


app.get('/test',(req,res)=>{

  console.log(req.verifiedUser)

})


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
