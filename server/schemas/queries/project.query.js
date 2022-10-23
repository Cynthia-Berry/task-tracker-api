const {GraphQLList, GraphQLString, GraphQLNonNull} = require('graphql');
const ProjectType = require('../types/project.type');
const ProjectModel = require('../../models/project.model');


const getAllProject = {
	type: new GraphQLList(ProjectType),
	description: "List of all Projects",
	resolve: () => {
		return ProjectModel.find().exec();
	}
};

const getProjectsById = {
	type: ProjectType,
	description: "Fetch a Project by Id",
	args: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
	},
	resolve: (root, param) => {
		const populateObject = [
			{
				path: "tasks", model: "Tasks",
				populate: [
					{path: "reporter", model: "Users", select: "-password"},
					{path: "assignee", model: "Users", select: "-password"}
				]
			},
			{path: "users", model: "Users", select: "-password"}
		];
		
		return ProjectModel.findById(param._id).populate(populateObject);
	}
};

const getProjectTask = {
	type: ProjectType,
	description: "Fetch a Project Tasks",
	args: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
	},
	resolve: (root, param) => {
		const populateObject = [
			{
				path: "tasks", model: "Tasks",
				populate: [
					{path: "reporter", model: "Users", select: "-password"},
					{path: "assignee", model: "Users", select: "-password"}
				]
			}
		];
		
		return ProjectModel.find(param._id).where('tasks').populate(populateObject);
	}
};


module.exports = {getAllProject, getProjectsById, getProjectTask}
