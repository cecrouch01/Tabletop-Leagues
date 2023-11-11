const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const leaguesSchema = new Schema({
  league: {
      type: Schema.Types.ObjectId,
      ref: 'League',
  }
});

const userSchema = new Schema ({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: { 
      type: String,
      required: true,
    },
    wins: {
      type: Number,
    },
    description: {
      type: String,
    },
    icon: {
      type: String,
      required: true,
    },
    leagues: [
      leaguesSchema
    ],
},
  {
    toJSON: {
      virtuals: true,
    },
});


userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      try{
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    } catch (error) {
      console.error('Error hashing password:', error);
      return next(error);
  }
}
  
    next();
  });
  
  userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };


const User = model('User', userSchema);

module.exports = User;