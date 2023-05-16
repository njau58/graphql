const express = require('express')
require('dotenv').config()
const port = process.env.PORT || 5000
const colors = require('colors')
const schema = require('./schema/schema')
const {graphqlHTTP} = require('express-graphql')

const app = express()
const {dbConnect} =  require('./config/db')


//MongoDB connection
dbConnect()

app.use('/graphql',graphqlHTTP({
    schema, 
    graphiql:process.env.NODE_ENV==='development'
}))

app.listen(port, console.log(`app listening to port ${port}`))




