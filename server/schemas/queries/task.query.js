const {GraphQLList, GraphQLString, GraphQLNonNull} = require('graphql');
const TaskType = require('../types/task.type');
const TaskModel = require('../../models/task.model');

const getTask = {
	type: new GraphQLList(TaskType),
	description: "List of all Task",
	resolve: () => {
		return TaskModel.find().exec();
	}
};

const getTaskById = {
	type: TaskType,
	description: "Fetch a Task by Id",
	args: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
	},
	resolve: (root, param) => {
		return TaskModel.findById(param._id).exec();
	}
};

const getTaskByAssignee = {
	type: new GraphQLList(TaskType),
	description: "Fetch All Tasks assigned to a specific user",
	args: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
	},
	resolve: (root, param) => {
		return TaskModel.find({user: param._id}).exec()
	}
};

const getTaskByPriority = {
	type: TaskType,
	description: "Fetch All Task by Priority Level",
	args: {
		priority: {type: new GraphQLNonNull(GraphQLString)},
	},
	resolve: (root, param) => {
		return TaskModel.find({priority: param.Priority}).exec();
	}
};

const getTaskByStatus = {
	type: TaskType,
	description: "Fetch a Task by Status",
	args: {
		status: {type: new GraphQLNonNull(GraphQLString)},
	},
	resolve: (root, param) => {
		return TaskModel.findOne({status: param.status}).exec();
	}
};


module.exports = {getTask, getTaskById, getTaskByAssignee, getTaskByPriority, getTaskByStatus}
