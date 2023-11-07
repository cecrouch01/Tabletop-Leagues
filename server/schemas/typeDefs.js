const typeDefs = `
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    description: String
    icon: String
}
type League {
    _id: ID!
    name: String!
    description: String!
    members: [User]!
    games: [Game]!
    active: Boolean!
}
    type Query {

}

    type Mutation {

}
`;

module.exports = typeDefs;
