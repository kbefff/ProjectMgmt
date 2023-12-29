const { projects, clients } = require("../sampleData.js")
const Project = require("../models/Project.js")
const Client = require("../models/Client.js")



const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require("graphql")

const ClientType = new GraphQLObjectType({
    name: "client",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    })
})

const ProjectType = new GraphQLObjectType({
    name: "project",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return clients.findById(parent.clientId)
            }
        }

    })
})


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find()
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //function to get single client from DB or sample data
                return Project.findById(args.id)
            }
        },
        //get all clients
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find()
            }
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //function to get single client from DB or sample data
                return Client.findById()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})