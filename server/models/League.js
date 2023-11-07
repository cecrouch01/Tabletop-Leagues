const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    game: [
        {
            player: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                unique: true,
            },
            place: {
                type: Number,
                min: 1,
                max: 4,
                unique: true,
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
            admin: {
                type: Boolean,
                required: true,
                unique: true,
            }
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