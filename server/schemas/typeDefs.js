const typeDefs = `
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    description: String
    icon: String
    leagues: [League]
}

type League {
    _id: ID!
    name: String!
    description: String!
    members: [Member]!
    games: [Game]
    active: Boolean!
}

type Game: {
    game: [GamePlayer]
}

type GamePlayer {
    player: User!
    place: Int
}

type Member {
    user: User!
    admin: Boolean
    points: Int
}

    type Query {

}

    type Mutation {

}
`;

module.exports = typeDefs;
