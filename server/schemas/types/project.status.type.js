const {GraphQLString, GraphQLObjectType, GraphQLNonNull} = require('graphql');


const StatusType = new GraphQLObjectType({
	name: 'StatusType',
	description: "This represent Projects' status Journey",
	fields: {
		_id: {type: GraphQLString},
		name: {type: new GraphQLNonNull(GraphQLString)},
		createdAt: {type: GraphQLString},
		updatedAt: {type: GraphQLString}
	}
});

module.exports = StatusType;
