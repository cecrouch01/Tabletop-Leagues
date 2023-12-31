const typeDefs = `
type User {
    _id: ID!
    username: String
    email: String
    password: String
    wins: Int
    description: String
    icon: String
    leagues: [LeagueArray]
    leagueCount: Int
    activeLeagues: [League]
    inactiveLeagues: [League]
}

type League {
    _id: ID!
    name: String
    description: String
    admin: User
    members: [Member]
    games: [Game]
    active: Boolean
    password: String
    memberCount: Int
    gameCount: Int
    winner: [User]
}

type LeagueArray {
    league: League
}

type Game {
    game: [GamePlayer]
}

type GamePlayer {
    user: User!
    place: Int
}

type Member {
    user: User!
    points: Int
}
input userInput {
    username: String
    email: String
    description: String
    icon: String
}
input MembersInput {
    league: ID!
}

        



type Query {
    getMe: User!
    getUser(_id: [ID]!): [User]!
    allUsers: [User]!
    allLeagues: [League]!
    getLeague(_id: ID!): League
    getLeagueByName(name: String!): [League]!
}

type Auth {
    token: ID!
    user: User
}
    
type Mutation {
    loginUser(email: String!, password: String!): Auth

    addUser(username: String!, email: String!, password: String!, description: String, icon: String): Auth

    updateUser(id: ID!, wins: Int, username: String, email: String, password: String, description: String, icon: String, addToLeagues: [ID]):User
    removeUser(_id: ID!): User
    
    addLeague( name: String! description: String! admin: ID active: Boolean password: String!): League
    updateLeague(active: Boolean members: MembersInput): League
    addMember(leagueId: ID!): League
    deactivateLeague(leagueId: ID!, active: Boolean!): League
    createGame(leagueId: ID!): League
    updatePoints(leagueId: ID!): League
}
        
`;

module.exports = typeDefs;