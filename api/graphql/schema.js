const { GraphQLSchema } = require("graphql");
const { RootMutation } = require("../graphql/mutations");
const { RootQuery } = require("../graphql/queries");

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
