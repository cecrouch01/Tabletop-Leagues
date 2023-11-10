const typeDefs = `
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    wins: INT
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
    winner: User
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

    type Query {
        getUser: User!
        getLeague: League!
}

    type Mutation {
        loginUser(email: String!, password: String!):User
        addUser(username: String!, email: String!, password: String!, description: String, icon: String):User
        updateUser(id: ID!, wins: INT, username: String, email: String, password: String, description: String, icon: String, addToLeagues: [ID]):User
        removeUser(_id: ID!):User

}
`;

module.exports = typeDefs;
