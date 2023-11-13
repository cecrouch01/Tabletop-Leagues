const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    game: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            place: {
                type: Number,
                min: 1,
                max: 4,
            },
        },
    ]
});

const memberSchema = new Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        points: {
            type: Number
        },
});

const leagueSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    members: [
        memberSchema
    ],
    games: [
        gameSchema
    ],
    active: {
        type: Boolean,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
},
   {
    toJSON: {
      virtuals: true,
    },
  },
);

leagueSchema.virtual('memberCount').get(function() {
    return this.members.length;
});

leagueSchema.virtual('gameCount').get(function() {
    return this.games.length;
});

leagueSchema.virtual('winner').get(function() {
    if (!this.active) {
        let maxPoints = -1;
        let winners = [];

        for (const member of this.members) {
            if (member.points > maxPoints) {
                maxPoints = member.points;
                winners = [member.user];
            } else if (member.points === maxPoints) {
                winners.push(member.user);
            }
        }

        if (winners.length > 0) {
            return winners;
        }
    }

    return null;
});

const League = model('League', leagueSchema);

module.exports = League;