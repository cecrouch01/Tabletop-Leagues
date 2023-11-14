const { User, League } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const bcrypt = require('bcrypt');

const resolvers = {
    Query: {
      getMe: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id });
        }
        throw AuthenticationError;
      },
      getUser: async (parent, user) => {
        return await User.findOne(user);
      },
      allUsers: async () => {
        return await User.find();
      },
      allLeagues: async () => {
        return await League.find();
      },
      getLeague: async (parent, _id) => {
        return await League.findById(_id);
      },
      getLeagueByName: async (parent, name) => {
        return await League.find(name)
      }

    },
  
    Mutation: {

      loginUser: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if(!user) {
          throw new Error(AuthenticationError)
        }
        const isPassword = await user.bcryptCompare(password);

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
      updateUser: async (parent, { id, username, email, password, description, icon, addToLeagues, context}) => {
        try {
          const userUpdate = {
            username,
            email,
            description,
            password,
            icon,
          };
  
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

      addLeague: async (parent, { name, description, password }, context) => {
        // try {
  
          if (!context.user) {
            throw new Error(AuthenticationError);
          } 
        
          const adminUser = await User.findById(context.user._id);
          console.log(adminUser);
          
          const leagueData = {
            name,
            description,
            active: true,
            password,
            admin: adminUser,
          };
    
          console.log(leagueData);
    
          const league = await League.create(leagueData);
          console.log(league);
      
          const user = adminUser;
      
          const token = signToken(user);
      
          return { token, league };
          // } catch (error) {
          //   console.error(error);
          //   throw new AuthenticationError('An error occurred');
          // }
      },
      addMember: async (parent, {leagueId} , context) => {
      
        if (context.user) {
          console.log(context.user)
          console.log(leagueId)
          let userInput = context.user;

          const updatedLeague = await League.findByIdAndUpdate(
            { _id: leagueId},
            { $addToSet: { members:  userInput  }},
            { new: true, runValidators: true }
          )
          console.log(updatedLeague)
          return updatedLeague;
        }
        throw new Error(AuthenticationError);
      },
      //ADMIN responbility
      deactivateLeague: async (parent, { leagueId, active } ) => {
        
        try {
          if (!active) {
            throw new AuthenticationError('No valid parameters provided');
          }
  
          const leagueActive = await League.findById(leagueId);
          console.log(leagueActive);
          if (!leagueActive) {
            throw new Error(AuthenticationError('Active League not found.'));
          }
  
          leagueActive.active = !leagueActive.active;
  
          const updatedActive = await leagueActive.save();
          console.log(updatedActive);
  
          return updatedActive;
        } catch (error) {
          console.error(error);
          // throw new Error(AuthenticationError('An error occurred'));
        }
      },
      //ADMIN responsibility
      createGame: async (parent, { users }) => {
        try {
          const usersData = await User.find({ _id: { $in: users } });
  
          if (usersData.length !== users.length) {
            throw new Error('Invalid user ID(s) provided');
          }
  
          const newGame = new Game({
            game: usersData.map((user, index) => ({
              user: user._id,
              place: index +1
            })),
          });
  
          // Save the new game to the database
          const savedGame = await newGame.save();
  
          return savedGame;
        } catch (error) {
          throw new Error(`Error creating game: ${error.message}`);
        }
      },
      
      updatePoints: async (parent, {game, _id}) => {
      try {
        // Find the league by ID
        const league = await League.findOne({ league: _id});
    
        if (!league) {
          throw new Error('League not found');
        }
    
        const games = await League.game.find({ game });
    
        for (const game of games) {
          const pointsMap = {
            1: 4,
            2: 3,
            3: 2,
            4: 1,
          };
    
          for (const member of game.members) {
            const pointsToAdd = pointsMap[member.place];
    
            const memberData = await League.member.findOne({ user: member.user, league: _id});
    
            if (memberData) {
              memberData.points = (memberData.points || 0) + pointsToAdd;
              await memberData.save();
            } else {
              const newMember = new League.member({
                user: member.user,
                points: pointsToAdd,
                league: league._id,
              });
              await newMember.save();
            }
          }
        }
    
        return 'Points updated successfully';
      } catch (error) {
        throw new Error(`Error updating points: ${error.message}`);
      }
    }, 
    },
      
  };
  
  module.exports = resolvers;
  