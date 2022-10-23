const {GraphQLNonNull, GraphQLString, GraphQLList} = require('graphql');
const ProjectType = require('../types/project.type');
const ProjectModel = require('../../models/project.model');
const Logger = require('../../middlewares/utils/logger');


const createProject = {
	type: ProjectType,
	args: {
		name: {
			name: 'name',
			type: new GraphQLNonNull(GraphQLString)
		},
		description: {
			name: 'description',
			type: GraphQLString
		},
		tasks: {
			name: 'tasks',
			type: new GraphQLList(GraphQLString)
		},
		users: {
			name: 'users',
			type: new GraphQLList(GraphQLString)
		},
		status: {
			name: 'status',
			type: GraphQLString
		},
	},
	resolve: async (root, params) => {
		const uModel = new ProjectModel({
			name: params.name,
			description: params.description,
			tasks: [...params.tasks],
			users: [...params.users],
			status: params.status,
		});
		const newProject = await uModel.save()
		if (!newProject) {
			const response = 'project Not saved';
			Logger.error(`[DATABASE ERROR]: ${response}`);
			throw new Error(response)
		}
		return newProject;
	}
}

const updateProject = {
	type: ProjectType,
	args: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		name: {
			name: 'name',
			type: new GraphQLNonNull(GraphQLString)
		},
		description: {
			name: 'description',
			type: GraphQLString
		},
		tasks: {
			name: 'tasks',
			type: new GraphQLList(GraphQLString)
		},
		users: {
			name: 'users',
			type: new GraphQLList(GraphQLString)
		},
		status: {
			name: 'status',
			type: GraphQLString
		},
	},
	resolve: async (_, param) => {
		let updateProject = {};
		if (param.name) updateProject.name = param.name;
		if (param.description) updateProject.description = param.description;
		
		const uProject = await ProjectModel.findByIdAndUpdate(param._id, updateProject, {new: true})
		if (!uProject) {
			const response = 'Project Not Updated';
			Logger.error(`[DATABASE ERROR]: ${response}`);
			throw new Error(response)
		}
		return uProject
	}
};

const deleteProject = {
	type: ProjectType,
	args: {
		_id: {
			name: '_id',
			type: new GraphQLNonNull(GraphQLString)
		}
	},
	resolve: async function (_, param) {
		const deleteProject = await ProjectModel.findByIdAndRemove(param._id)
		if (!deleteProject) {
			const response = 'Project Not deleted';
			Logger.error(`[DATABASE ERROR]: ${response}`);
			throw new Error(response)
		}
		return deleteProject
	}
};

const updateProjectTask = {
	type: ProjectType,
	args: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		tasks: {
			name: 'tasks',
			type: new GraphQLList(GraphQLString)
		},
		
	},
	resolve: async (_, param) => {
		let updateTaskProject = {tasks: [...param.tasks]};
		
		const uTask = await ProjectModel.findByIdAndUpdate(param._id, updateTaskProject, {new: true})
		if (!uTask) {
			throw new Error('Error')
		}
		return uTask
	}
};

const updateProjectUser = {
	type: ProjectType,
	args: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		users: {
			name: 'users',
			type: new GraphQLList(GraphQLString)
		},
	},
	resolve: async (_, param) => {
		let updateProject = {};
		if (param.name) updateProject.name = [...param.name];
		if (param.description) updateProject.description = param.description;
		
		const uProject = await ProjectModel.findByIdAndUpdate(param._id, updateProject, {new: true})
		if (!uProject) {
			throw new Error('Error')
		}
		return uProject
	}
};


module.exports = {createProject, updateProject, deleteProject, updateProjectTask, updateProjectUser}
