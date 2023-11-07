const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    playerPlacements: [
        {
            player: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            place: {
                type: Number,
                min: 1,
                max: 4,
            },
        },
    ],
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
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    ],
    games: [
        gameSchema
    ],
    active: {
        type: Boolean,
        required: true,
    }
},
   {
    toJSON: {
      virtuals: true,
    },
  },
);



const League = model('League', leagueSchema);

module.exports = League;