const express = require('express')
require('dotenv').config()
const port = process.env.PORT || 5000
const colors = require('colors')
const schema = require('./schema/schema')//graphql schema
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')

const app = express()
const {dbConnect} =  require('./config/db')


//MongoDB connection
dbConnect()

app.use(cors())

app.use('/api',graphqlHTTP({
    schema, 
    graphiql:process.env.NODE_ENV==='development'
}))


if( port){
    app.listen(port, console.log(`app listening to port ${port}`))

}



module.exports=app



