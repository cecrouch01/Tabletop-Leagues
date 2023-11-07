const { Schema, model } = require('mongoose');

const leagueSchema = new Schema ({
 
},
   {
    toJSON: {
      virtuals: true,
    },
  },
);



const League = model('User', userSchema);

module.exports = League, leagueSchema;