const Project = require("../models/Project");
const Client = require("../models/Client");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { ClientType, ProjectType, UserType } = require("./typeDefs");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,

  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");
const { generateToken } = require("../util/generateJWT");

const RootMutation = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    //Register user

    register: {
      type: GraphQLString,
      description: "Register new user",
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },

      async resolve(parent, args) {
        const userExist = await User.findOne({ email: args.email });
        if (userExist) throw new Error("Email address already in use");

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(args.password, salt);

        const user = new User({
          email: args.email,
          password: hashedPassword,
        });

        user.save();

        const token = generateToken(user);

        return token;
      },
    },

    //Login

    login: {
      type: GraphQLString,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },

      async resolve(parent, args) {
        const userRegistered = await User.findOne({ email: args.email });
        if (!userRegistered) throw new Error("Email not registered");
        if (!(await bcrypt.compare(args.password, userRegistered.password)))
          throw new Error("Invalid credentials");

        if (await bcrypt.compare(args.password, userRegistered.password)) {
          const token = generateToken(userRegistered);
          return token;
        }
      },
    },

    //add client
    addClient: {
      type: ClientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },

      resolve(parent, args,{verifiedUser}) {
        const client = new Client({
authorId:verifiedUser.user._id,
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return client.save();
      },
    },
    //delete client

    deleteClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },

      resolve(parent, args) {
        Project.find({ clientId: args.id }).then((projects) => {
          projects.forEach((project) => {
            project.deleteOne();
          });
        });

        return Client.findByIdAndDelete(args.id);
      },
    },

    //edit client

    editClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },

      resolve(parent, args) {
        return Client.findByIdAndUpdate(
          { _id: args.id },
          { $set: { name: args.name, email: args.email, phone: args.phone } },
          { new: true }
        );
      },
    },

    //Add Project

    addProject: {
      type: ProjectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        startDate: { type: new GraphQLNonNull(GraphQLString) },
        dueDate: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
            defaultValue: "Not Started",
          }),
        },

        clientId: { type: new GraphQLNonNull(GraphQLID) },
      },

      resolve(parent, args,{verifiedUser}) {
        const project = new Project({
          name: args.name,
          authorId:verifiedUser.user._id,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
          startDate: args.startDate,
          dueDate: args.dueDate,
        });

        return project.save();
      },
    },

    // Update Project

    updateProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        startDate: { type: new GraphQLNonNull(GraphQLString) },
        dueDate: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },

      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          { _id: args.id },
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
              startDate: args.startDate,
              dueDate: args.dueDate,
            },
          },
          { new: true }
        );
      },
    },

    //Delete Project

    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },

      resolve(parent, args) {
        return Project.findByIdAndDelete(args.id);
      },
    },
  },
});
module.exports = { RootMutation };
