const express = require('express');

const { graphqlHTTP } =  require('express-graphql');

const schema = require('./schema');

require('dotenv').config();

const port = process.env.PORT || 8000;

const app = express();

// only endpoint for requests
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}));

app.listen(port, console.log(`Server is running on port ${port}`));