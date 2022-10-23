const {GraphQLString, GraphQLBoolean, GraphQLObjectType, GraphQLNonNull, GraphQLEnumType} = require('graphql');

const UserType = new GraphQLObjectType({
	name: 'UserType',
	description: "This represent a User",
	fields: {
		_id: {type: GraphQLString},
		firstName: {type: new GraphQLNonNull(GraphQLString)},
		lastName: {type: new GraphQLNonNull(GraphQLString)},
		email: {type: new GraphQLNonNull(GraphQLString)},
		phoneNumber: {type: new GraphQLNonNull(GraphQLString)},
		password: {type: new GraphQLNonNull(GraphQLString)},
		role: {
			type: new GraphQLEnumType({
				name: 'RoleEnum',
				values: {
					ADMIN: {
						value: 'ADMIN',
					},
					CLIENT: {
						value: 'CLIENT',
					},
				}
			})
		},
		verified: {type: GraphQLBoolean},
		createdAt: {type: GraphQLString},
		updatedAt: {type: GraphQLString},
		token: {type: GraphQLString}
	}
});

module.exports = UserType;
