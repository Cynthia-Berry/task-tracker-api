const {GraphQLString, GraphQLObjectType, GraphQLNonNull} = require('graphql');

const AuthType = new GraphQLObjectType({
	name: 'AuthType',
	description: "This represent a User",
	fields: {
		_id: {type: GraphQLString},
		userId: {type: new GraphQLNonNull(GraphQLString)},
		expireDate: {type: GraphQLString},
		token: {type: GraphQLString}
	}
});

module.exports = AuthType;
