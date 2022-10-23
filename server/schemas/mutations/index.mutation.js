const {GraphQLObjectType} = require("graphql");
const {login,createUser, updateUser, deleteUser, toggleUserRole, toggleUserVerify} = require("./user.mutation");
const {createTask, updateTask, deleteTask} = require("./task.mutation");
const {createStatus, updateStatus, deleteStatus} = require("./project.status.mutation");
const {createProject, updateProject, deleteProject, updateProjectTask, updateProjectUser} = require("./project.mutation");

const RootMutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		login,
		createUser, updateUser, deleteUser, toggleUserRole, toggleUserVerify,
		createTask, updateTask, deleteTask,
		createStatus, updateStatus, deleteStatus,
		createProject, updateProject, deleteProject, updateProjectTask, updateProjectUser
	}
});

module.exports = RootMutation;
