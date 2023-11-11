const { shield, rule, allow } = require('graphql-shield');
const { League } = require('../models');



const isLeagueAdmin = rule()(async (parent, args, ctx, info) => {
    // console.log(args);
    // console.log(ctx);
    console.log(ctx.user._id);
    if (args.leagueId) {
        const league = League.findById(args.leagueId);
        console.log(args.leagueId);
        console.log(league)
        return league.admin.contains(ctx.user._id);
    }

    return false
    // return ctx?.user?.role === 'admin'
})



// your current schema definition...
const permissions = shield(
    {
        Query: {
            getMe: allow
        },
        Mutation: {
            loginUser: allow,
            deactivateLeague: isLeagueAdmin
        },
    },
    {
        allowExternalErrors: true,
        fallbackRule: allow,
        debug: true,
    }
)

module.exports = permissions;