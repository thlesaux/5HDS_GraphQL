const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')

const port = process.env.PORT || 9000
const app = express()

const fs = require('fs')

//Differents schemas for each kind of model
const typeDefs = fs.readFileSync('./schemas/schema.graphql', { encoding: 'utf-8' })
const productTypeDefs = fs.readFileSync('./schemas/productSchema.graphql', { encoding: 'utf-8' })
const userTypeDefs = fs.readFileSync('./schemas/userSchema.graphql', { encoding: 'utf-8' })

//Differents resolvers for each kind of model
const userResolvers = require('./services/userResolvers')
const productResolvers = require('./services/productResolvers')

const { makeExecutableSchema } = require('graphql-tools')
const schema = makeExecutableSchema({
    typeDefs: [userTypeDefs, productTypeDefs, typeDefs],
    resolvers: [userResolvers, productResolvers]
});

app.use(cors(), bodyParser.json())

const { graphiqlExpress, graphqlExpress } = require('apollo-server-express')
app.use('/graphql', graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(
    port, () => console.info(
        `Server started on port ${port}`
    )
)