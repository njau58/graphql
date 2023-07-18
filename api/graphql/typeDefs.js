const {
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLID,
  GraphQLString,
 
} = require("graphql");
const {
  dateCreatedScalar,
  dateUpdatedScalar,
} = require("../util/dateCustomScalar");
const Client = require('../models/Client')

const UserType = new GraphQLObjectType({
  name:"User",
  fields:() => ({
    email:{type:GraphQLString},
    password:{type:GraphQLString},
    token:{type:GraphQLString}
  })
})

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    authorId:{type:GraphQLString},
    name: { type: GraphQLString },
    status: { type: GraphQLString },
    description: { type: GraphQLString },
    startDate: { type: GraphQLString },
    dueDate: { type: GraphQLString },
    createdAt: { type: new GraphQLScalarType(dateCreatedScalar) },
    updatedAt: { type: new GraphQLScalarType(dateUpdatedScalar) },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

module.exports = { ProjectType, ClientType, UserType };
