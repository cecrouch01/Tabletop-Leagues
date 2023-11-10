const { shield, rule } = require('graphql-shield');



const isLeagueAdmin = rule()(async (parent, args, ctx, info) => {
    console.log(args);
    console.log(ctx);
    if (args.leagueId) {
        const league = League.findById(args.leagueId);
        return league.admins.contains(ctx.user._id);
    }

    return false
    // return ctx?.user?.role === 'admin'
})


// your current schema definition...
const permissions = shield({
    Mutation: {
        updateLeague: isLeagueAdmin
    }
})

module.exports = permissions;