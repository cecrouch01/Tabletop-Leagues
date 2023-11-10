const { shield, rule } = require('graphql-shield');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const { applyMiddleware } = require('graphql-middleware');

const isLeagueAdmin = rule()(async (parent, args, ctx, info) => {
    console.log(args);
    console.log(ctx);
 return ctx?.user?.role === 'admin'
})


// your current schema definition...
const permissions = shield({
    Mutation: {
        updateLeague: isLeagueAdmin
    }
})

const schema = applyMiddleware(makeExecutableSchema({ 
    typeDefs,
    resolvers
}), permissions)