const typeDefs = `
type User {
    _id: ID!
    username: String
    email: String
    password: String
    wins: Int
    description: String
    icon: String
    leagues: [League]
}

type League {
    _id: ID!
    name: String!
    description: String!
    admin: User!
    members: [Member]!
    games: [Game]
    active: Boolean!
    password: String!
}

type Game {
    game: [GamePlayer]
}

type GamePlayer {
    player: User!
    place: Int
}

type Member {
    user: User!
    points: Int
}
input userInput {
    username: String
    email: String
    password: String
    description: String
    icon: String
}
input MembersInput {
    league: ID!
}

        
input AddMemberInput {
    league: ID!
}


type Query {
    getMe: User!
    getUser: User!
    getLeague: League!
    allUsers: [User]!

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
    
    addLeague( name: String! description: String! admin: ID active: Boolean! password: String!): League
     updateLeague(active: Boolean members: MembersInput): League
    addMember(members: AddMemberInput!): League
    deactivateLeague(active: ID!): League
    createGame(users: [ID!]!): League
    updatePoints(leagueId: ID!): League
}
        
`;

module.exports = typeDefs;