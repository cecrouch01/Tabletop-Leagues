const { Schema, model } = require('mongoose');

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