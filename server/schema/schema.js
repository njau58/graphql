// const { projects, clients } = require("../schema/sampleData");

const Project = require("../models/Project")
const Client = require("../models/Client")

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
   
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    status: { type: GraphQLString },
    description: { type: GraphQLString },
    client:{
      type:ClientType,
      resolve(parent, args){
        return Client.findById(parent.clientId);
      }
    }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      },
    },

    deleteById: {
      type: new GraphQLList(ClientType),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.deleteById(args.id);
      },
    },

    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        

        return Client.findById(args.id)
      },
    },

    project:{
      type:ProjectType,
      args:{id:{type:GraphQLID}},
      resolve(parent, args){
        return Project.findById(args.id)
      }

    },

    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, arg) {
        return Project.find();
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
