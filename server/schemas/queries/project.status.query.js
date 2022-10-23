const {GraphQLList, GraphQLString, GraphQLNonNull} = require('graphql');
const StatusType = require('../types/project.status.type');
const StatusModel = require('../../models/project.status.model');

const getAllStatus = {
	type: new GraphQLList(StatusType),
	description: "List of all Status",
	resolve: () => {
		return StatusModel.find().exec();
	}
};

const getStatusById = {
	type: StatusType,
	description: "Fetch a Status by Id",
	args: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
	},
	resolve: (root, param) => {
		return StatusModel.findById(param._id).exec();
	}
};


module.exports = {getAllStatus, getStatusById}
