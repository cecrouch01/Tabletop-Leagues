const { User, League } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { ObjectId } = require('mongodb');
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
      addMember: async (parent, {userInput, leagueId}, context) => {
        if (context.user) {
          let userInput = context.user;

          const updatedLeague = await League.findByIdAndUpdate(
            { _id: leagueId},
            { $addToSet: { members: userInput } },
            { new: true, runValidators: true }
          )
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
      createGame: async (parent, { leagueId }) => {
        const league = await League.findById(leagueId);
        let members = league.members; 
        console.log('1', members);
        members = await User.find({
          '_id': { $in: members.map(member => new ObjectId(member._id))}
        })
        const games = members.map (member => {
             return({game:{
              user: new ObjectId(member._id),
              place: 0
             }});
        });
        console.log('2', members);    
        

        if (!league) {throw new Error('League not found');}
        if (!games) {throw new Error('Game not created');}
        const updatedLeague = await League.findByIdAndUpdate( leagueId,
          { $push: { games } },
          { new: true, runValidators: true }
      );
      console.log(updatedLeague);
      if (!updatedLeague) {
        throw new Error('Error updating league')
      }
          return(updatedLeague);
      },
      
      updateLeague: async (parent, { leagueId }) => {
        const league = await League.findbyId({ leagueId });
        
        
        
      },
       
  
    },
  };
  
  module.exports = resolvers;
  