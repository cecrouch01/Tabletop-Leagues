const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    game: [
        {
            player: {
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
        },
    ],
});

const memberSchema = new Schema({
    member: {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        points: {
            type: Number
        },
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
    winner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
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



const League = model('League', leagueSchema);

module.exports = League;