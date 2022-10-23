const {
	GraphQLString,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLEnumType,
	GraphQLList
} = require('graphql');
const UserType = require('./user.type')

const CommentType = new GraphQLObjectType({
	name: 'CommentType',
	description: 'This Represents Task Comments',
	fields: {
		comment: {type: GraphQLString},
		commentedBy: {type: GraphQLString},
		commentedAt: {type: GraphQLString}
	}
});

const TaskType = new GraphQLObjectType({
	name: 'TaskType',
	description: "This represent a Task",
	fields: {
		_id: {type: GraphQLString},
		name: {type: new GraphQLNonNull(GraphQLString)},
		description: {type: GraphQLString},
		assignee: {type: UserType},
		reporter: {type: UserType},
		dueDate: {type: GraphQLString},
		priority: {
			type: new GraphQLEnumType({
				name: 'PriorityEnum',
				values: {
					HIGHEST: {
						value: 'HIGHEST',
					},
					HIGH: {
						value: 'HIGH',
					},
					MEDIUM: {
						value: 'MEDIUM',
					},
					LOW: {
						value: 'LOW',
					},
					LOWEST: {
						value: 'LOWEST',
					},
				}
			})
		},
		status: {
			type: new GraphQLEnumType({
				name: 'StatusEnum',
				values: {
					TODO: {
						value: 'TODO',
					},
					PROGRESS: {
						value: 'PROGRESS',
					},
					REVIEW: {
						value: 'REVIEW',
					},
					QA: {
						value: 'QA',
					},
					CERTIFIED: {
						value: 'CERTIFIED',
					},
				}
			})
		},
		comments: {
			name: 'Comments',
			type: new GraphQLList(CommentType)
		},
		createdAt: {type: GraphQLString},
		updatedAt: {type: GraphQLString}
	}
});

module.exports = TaskType;
