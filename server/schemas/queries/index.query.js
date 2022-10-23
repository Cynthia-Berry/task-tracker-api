const {GraphQLObjectType} = require("graphql");
const {getAllUsers, getAllAdmins, getAllClients, getUsersById, getAdminById, getClientById} = require("./user.query");
const {getTask, getTaskById, getTaskByAssignee, getTaskByPriority, getTaskByStatus} = require("./task.query");
const {getAllStatus, getStatusById} = require("./project.status.query");
const {getAllProject, getProjectsById, getProjectTask} = require("./project.query");

const RootQuery = new GraphQLObjectType({
	name: 'Query',
	fields: {
		getAllUsers, getAllAdmins, getAllClients, getUsersById, getAdminById, getClientById,
		getTask, getTaskById, getTaskByAssignee, getTaskByPriority, getTaskByStatus,
		getAllStatus, getStatusById,
		getAllProject, getProjectsById, getProjectTask
	}
});

module.exports = RootQuery;
