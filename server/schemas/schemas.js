const {GraphQLSchema} = require('graphql');
const RootQuery = require('../schemas/queries/index.query');
const RootMutation = require('../schemas/mutations/index.mutation');


const Schema = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutation
});

module.exports = Schema;
