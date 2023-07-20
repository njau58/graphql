const Project = require("../models/Project");
const Client = require("../models/Client");
const { ClientType, ProjectType } = require("./typeDefs");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLString,
} = require("graphql");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args, { verifiedUser }) {
        return Client.find({ authorId: verifiedUser.user._id });
      },
    },

    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },

    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },

    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, arg, { verifiedUser }) {
        return Project.find({ authorId: verifiedUser.user._id });
      },
    },

    user: {
      type: GraphQLString,
      resolve(parent, _, { verifiedUser }) {
        return verifiedUser.user.email;
      },
    },
  },
});

module.exports = { RootQuery };
