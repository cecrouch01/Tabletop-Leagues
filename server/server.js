const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers, permissions } = require('./schemas');
const db = require('./config/connection');
const { applyMiddleware } = require('graphql-middleware');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const schema = applyMiddleware(makeExecutableSchema({ 
    typeDefs,
    resolvers
}), permissions);

const app = express();

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
    schema,
    context: authMiddleware
});

const grady = () => {
    return {
        _id: 1,
        username: "IamGrady",
        email: "grady@example.com",
        password: "password",
        description: "",
        icon: ""
    }
}

const startApolloSever = async () => {
    await server.start();

    app.use(express.urlencoded({ extended: false}));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server, {
        context: authMiddleware
    }));

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));
    
        app.get('*', (req, res) => {
          res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
    }

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        });
    });
};

startApolloSever();