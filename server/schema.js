const {todos} = require('./sampleData');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema } = require('graphql');

// define Todo type
const TodoType = new GraphQLObjectType({
    name: 'Todo',
    fields: {
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        completion: {type: GraphQLBoolean}
    }
});

// the root query is the entry point into our API

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',

    // the fields property defines the types of queries that we can make
    fields: {

        // this query allows us to retrieve all todos
        todos: {
            type: new GraphQLList(TodoType),
            resolve: (parent, args) => {
                return todos;
            }
        },

        // this query allows us to retrieve by id
        todo: {
            type: TodoType,
            args: { id: {type: GraphQLID}},
            resolve: (parent, args) => {
                return todos.find(todo => todo.id == args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})