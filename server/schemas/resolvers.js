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
        return await User.findOne(user._id);
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

      addLeague: async (parent, { name, description, admin, active, password }, context) => {
        try {
          let adminUser = { admin };
  
          if (context.user && context.user._id) {
            adminUser = await User.findById(context.user._id);
            console.log(adminUser);
          }

  
          const leagueData = {
            name,
            description,
            active,
            password,
            admin: adminUser,
          };

          console.log(leagueData);
  
          const league = await League.create(leagueData);
          console.log(league);
          if (!league) {
            throw new Error(AuthenticationError('Failed to create league'));
          }
  
          const user = adminUser;
  
          const token = signToken(user);
  
          return { token, league };
        } catch (error) {
          console.error(error);
          throw new AuthenticationError('An error occurred');
        }
      },
      updateLeague: async (parent, context,{ active, members }) => {
        try {
          if (!context.user || !context.user._id) {
            throw new AuthenticationError('User not authenticated');
          }

          if (members) {
            const user = await User.findById(context.user._id);

            const newMember = {
              user: user._id,
            };

            await League.findOneAndUpdate(
              { _id: members.league._id },
              { $push: { members: newMember } },
              { new: true }
            );
          }

          if (active) {
            const leagueActive = await League.findById(active);

            if (!leagueActive) {
              throw new AuthenticationError('Active League not found.');
            }

            leagueActive.active = !leagueActive.active;

            const updatedActive = await leagueActive.save();

            return {
              success: true,
              message: 'League successfully activated/deactivated',
              object: updatedActive,
            };
          }

          throw new AuthenticationError('No valid parameters provided');
        } catch (error) {
          console.error(error);
          throw new AuthenticationError('An error occurred');
        } 
      },
      //ADMIN responsibilty
      addMember: async (parent, context, {members}) => {
        try {
          if (!context.user || !context.user._id) {
            throw new AuthenticationError('User not authenticated');
          }
  
          const user = await User.findById(context.user._id);
  
          if (members) {
            const newMember = {
              user: user._id,
            };
  
            const updatedLeague = await League.findOneAndUpdate(
              { _id: members.league._id },
              { $push: { members: newMember } },
              { new: true }
            );
  
            return { success: true, message: 'Member added successfully', league: updatedLeague };
          }
  
          throw new AuthenticationError('No valid parameters provided');
        } catch (error) {

          throw new AuthenticationError('An error occurred');
        }
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
  
          return {
            success: true,
            message: 'League successfully activated/deactivated',
            object: updatedActive,
          };
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
  