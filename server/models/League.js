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



const League = model('League', leagueSchema);

module.exports = League;