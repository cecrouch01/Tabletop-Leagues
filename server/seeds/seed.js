const { User, League } = require('../models')
const userSeeds = require('./userSeeds.json')
const leagueSeeds = require('./leagueSeeds.json')
const userLeagueSeeds = require('./userLeagueSeeds.json')
const db = require('../config/connection');
const bcrypt = require('bcrypt');

async function getUserIdByUsername(username) {
  const user = await User.findOne({ username });
  return user ? user._id : null;
}

async function getUserId(leaguesData) {
  const updatedLeaguesData = [];

  for (const league of leaguesData) {
    const adminId = await getUserIdByUsername(league.admin);
    const updatedMembers = await Promise.all(
      league.members.map(async (member) => {
        const memberId = await User.findOne({ username: member.user });
        return { user: memberId._id, points: member.points };
      })
    );
    const updatedGames = await Promise.all(
      league.games.map(async (gameObject) => {
        const game = gameObject.game || [];
    
        const updatedPlayers = await Promise.all(
          game.map(async (player) => {
            const playerId = await getUserIdByUsername(player.user);
            return { user: playerId, place: player.place };
          })
        );
    
        return { game: updatedPlayers };
      })
    );

    updatedLeaguesData.push({
      ...league,
      admin: adminId,
      members: updatedMembers,
      games: updatedGames,
    });
  }

  return updatedLeaguesData;
}

async function getLeagueIdByName(leagueName) {
  const league = await League.findOne({ name: leagueName });
  return league ? league._id : null;
}

async function getLeagueId(userLeagueSeeds) {
  try {
    for (const userSeed of userLeagueSeeds) {
      const existingUser = await User.findOne({ username: userSeed.username });

      if (existingUser) {
        const updatedLeagues = [];

        for (const leagueSeed of userSeed.leagues) {
          const leagueId = await getLeagueIdByName(leagueSeed.league);

          if (leagueId) {
            updatedLeagues.push({
              league: leagueId,
            });
          }
        }

        await User.updateOne(
          { username: userSeed.username },
          {
            $set: {
              leagues: updatedLeagues,
            },
          }
        );

        console.log(`${userSeed.username}" updated.`);
      } else {
        console.log(`${userSeed.username}" not found. Skipping update.`);
      }
    }

    console.log('Seeded users updated successfully.');
  } catch (error) {
    console.error('Error updating seeded users:', error);
  }
}

// async function rehashPasswords() {
//   try {
//     const users = await User.find();

//     for (const user of users) {
//       const newPasswordHash = await bcrypt.hash(user.password, 10);

//       await User.findByIdAndUpdate(user._id, { password: newPasswordHash });
//     }

//     console.log('Passwords rehashed successfully.');
//   } catch (error) {
//     console.error('Error rehashing passwords:', error);
//   }
// }


db.once('open', async () => {
  try {
    await User.deleteMany({});
    await League.deleteMany({});
    await User.insertMany(userSeeds);
    console.log('Users seeded successfully.');
    // await rehashPasswords();

    const updatedLeaguesData = await getUserId(leagueSeeds);
    await League.insertMany(updatedLeaguesData);
    console.log('Leagues seeded successfully.');

    await getLeagueId(userLeagueSeeds);
    console.log('User leagues updated successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    db.close()
  }
});