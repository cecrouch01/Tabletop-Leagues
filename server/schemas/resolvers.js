const { User, League } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const bcrypt = require('bcrypt');

const resolvers = {
    Query: {
      getUser: async (parent, arg, context) => {
        if (!context.user){
          throw new Error(AuthenticationError)
        }
        return await User.findById(context.user._id);
      },
      getLeague: async (parent, arg, context) => {
        if (!context.user){
          throw new Error(AuthenticationError)
        }
        return await League.findById(context.league._id);
      },

    },
  
    Mutation: {

      loginUser: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if(!user) {
          throw new Error(AuthenticationError)
        }
        const isPassword = await user.isCorrectPassword(password);

        if(!isPassword) {
          throw new Error(AuthenticationError)
        }
        const token = signToken(user);

        return { token, user};
      },
      addUser: async (parent, {username, email, password, description, icon}) => {
        const user = await User.create({username, email, password, description, icon});

        if (!user) {
          throw new Error(AuthenticationError);
        }
        const token = signToken(user);

        return {token, user};
      },
      updateUser: async (parent, { id, username, email, password, description, icon, addToLeagues}) => {
        try {
          const userUpdate = {
            username,
            email,
            description,
            icon,
          };
  
          if (password) {
            const saltRounds = 10;
            userUpdate.password = await bcrypt.hash(password, saltRounds);
          }
  
          if (addToLeagues) {

            userUpdate.leagues = addToLeagues;
          }
  
          const user = await User.findByIdAndUpdate(id, userUpdate, { new: true });
  
          if (!user) {
            throw new Error(AuthenticationError);
          }
  
          const token = signToken(user);
  
          return { token, user };
        } catch (error) {
          throw new Error(AuthenticationError);
        }
      },
  
      removeUser: async (parent, {_id}) => {
        const user = await User.delete(_id);

        if (!user) {
          throw new Error(AuthenticationError);
        }
        const token = signToken(user);

        return {token, user};
      },


    },
  };
  
  module.exports = resolvers;
  