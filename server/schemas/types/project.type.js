const {GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLList} = require('graphql');
const TaskType = require('./task.type');
const UserType = require('./user.type');
const ProjectStatusType = require('./project.status.type');


const ProjectType = new GraphQLObjectType({
	name: 'ProjectType',
	description: "This represent a user",
	fields: () => ({
		_id: {type: GraphQLString},
		name: {type: new GraphQLNonNull(GraphQLString)},
		description: {type: GraphQLString},
		tasks: {type: new GraphQLList(TaskType)},
		users: {type: new GraphQLList(UserType)},
		status: {type: ProjectStatusType},
		createdAt: {type: GraphQLString},
		updatedAt: {type: GraphQLString}
	})
});

module.exports = ProjectType;
