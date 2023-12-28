const {project, clients} = require("../sampleData.js") 


const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema} = require("graphql")

const ClientType = new GraphQLObjectType({
    name: "client",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
    })
 })

 const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        client: {
            type: ClientType,
            args: {id: {type:GraphQLID}},
            resolve(parent, args) {
                //function to get single client from DB or sample data
                return clients.find(client => client.id === args.id)
            }
        }
    }
 })

 module.exports = new GraphQLSchema({
    query: RootQuery
 })