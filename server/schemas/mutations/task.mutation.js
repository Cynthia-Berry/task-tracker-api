const {GraphQLNonNull, GraphQLString} = require('graphql');
const TaskType = require('../types/task.type');
const TaskModel = require('../../models/task.model')
const Logger = require('../../middlewares/utils/logger');

const createTask = {
	type: TaskType,
	args: {
		name: {
			name: 'name',
			type: new GraphQLNonNull(GraphQLString)
		},
		description: {
			name: 'description',
			type: GraphQLString
		},
		assignee: {
			name: 'assignee',
			type: new GraphQLNonNull(GraphQLString)
		},
		reporter: {
			name: 'reporter',
			type: new GraphQLNonNull(GraphQLString)
		},
		dueDate: {type: GraphQLString},
		priority: {type: GraphQLString},
	},
	resolve: async (root, params) => {
		const uModel = new TaskModel({
			name: params.name,
			description: params.description,
			assignee: params.assignee,
			reporter: params.reporter,
			dueDate: params.dueDate,
			priority: params.priority
		});
		const newTask = await uModel.save()
		if (!newTask) {
			const response = 'Task Not saved';
			Logger.error(`[DATABASE ERROR]: ${response}`);
			throw new Error(response)
		}
		return newTask;
	}
}

const updateTask = {
	type: TaskType,
	args: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		name: {
			name: 'name',
			type: GraphQLString
		},
		description: {
			name: 'description',
			type: GraphQLString
		},
		assignee: {
			name: 'assignee',
			type: GraphQLString
		},
		reporter: {
			name: 'reporter',
			type: GraphQLString
		},
		dueDate: {
			name: 'dueDate',
			type: GraphQLString
		},
	},
	resolve: async (_, param) => {
		let updateTask = {};
		if (param.name) updateTask.name = param.name;
		if (param.description) updateTask.description = param.description;
		if (param.assignee) updateTask.assignee = param.assignee;
		if (param.reporter) updateTask.reporter = param.reporter;
		if (param.dueDate) updateTask.dueDate = param.dueDate;
		
		const uTask = await TaskModel.findByIdAndUpdate(param._id, updateTask, {new: true})
		if (!uTask) {
			const response = 'Task Not Updated';
			Logger.error(`[DATABASE ERROR]: ${response}`);
			throw new Error(response)
		}
		return uTask
	}
};

const deleteTask = {
	type: TaskType,
	args: {
		_id: {
			name: '_id',
			type: new GraphQLNonNull(GraphQLString)
		}
	},
	resolve: async function (_, param) {
		const deleteTask = await TaskModel.findByIdAndRemove(param._id)
		if (!deleteTask) {
			const response = 'Task Not Deleted';
			Logger.error(`[DATABASE ERROR]: ${response}`);
			throw new Error(response)
		}
		return deleteTask
	}
};

module.exports = {createTask, updateTask, deleteTask}
