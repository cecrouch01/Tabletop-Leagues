const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    game: [
        {
            player: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                place: {
                    type: Number,
                    min: 1,
                    max: 4,
                }
            },
        },
    ],
});

const memberSchema = new Schema({
    member: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        admin: {
            type: Boolean,
            required: true,
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
},
   {
    toJSON: {
      virtuals: true,
    },
  },
);



const League = model('League', leagueSchema);

module.exports = League;