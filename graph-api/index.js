const {
    ApolloServer
} = require('apollo-server-azure-functions');


const typeDefs = `
  type Random {
    id: Int!
    rand: String
  }

  type Query {
    rands: [Random]
    rand(id: Int!): Random
  }
`;

const rands = [{
    id: 1,
    rand: 'random'
}, {
    id: 2,
    rand: 'modnar'
}];

const resolvers = {
    Query: {
        rands: () => rands,
        rand: (_, {
            id
        }) => rands.find(rand => rand.id === id),
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});
module.exports = server.createHandler();