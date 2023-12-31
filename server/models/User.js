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


userSchema.methods.bcryptCompare = async function (inputPassword) {
  console.log('Comparing input password:', inputPassword);
  console.log('Stored hashed password:', this.password);
  return await bcrypt.compare(inputPassword, this.password);
};

userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password') || this.isNew) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
      console.log('Hashed password before saving:', this.password);
    }
    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    next(error);
  }
});

userSchema.virtual('leagueCount').get(function() {
  return this.leagues.length;
});

userSchema.virtual('activeLeagues').get(async function () {
  const League = model('League');
  const leagues = await League.find({ 'members.user': this._id, active: true }).select('_id');
  return leagues.map(league => league._id);
});

userSchema.virtual('inactiveLeagues').get(async function () {
  const League = model('League');
  const leagues = await League.find({ 'members.user': this._id, active: false }).select('_id');
  return leagues.map(league => league._id);
});

const User = model('User', userSchema);

module.exports = User;
