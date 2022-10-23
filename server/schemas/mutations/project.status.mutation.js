const {GraphQLNonNull, GraphQLString} = require('graphql');
const Logger = require('../../middlewares/utils/logger');
const StatusType = require('../types/project.status.type');
const StatusModel = require('../../models/project.status.model')
const Config = require('../../middlewares/enums/config.enum');


const createStatus = {
	type: StatusType,
	args: {
		name: {
			name: 'name',
			type: new GraphQLNonNull(GraphQLString)
		}
	},
	resolve: async (root, params) => {
		const uModel = new StatusModel({name: params.name});
		const newStatus = await uModel.save()
		if (!newStatus) {
			const response = 'Status Not saved';
			Logger.error(`[DATABASE ERROR]: ${response}`);
			throw new Error(response)
		}
		return newStatus;
	}
}

const updateStatus = {
	type: StatusType,
	args: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		name: {
			name: 'name',
			type: new GraphQLNonNull(GraphQLString)
		}
	},
	resolve: async (_, param) => {
		let updateStatus = {};
		if (param.name) updateStatus.name = param.name;
		const uStatus = await StatusModel.findByIdAndUpdate(param._id, updateStatus, {new: true})
		if (!uStatus) {
			const response = 'Status Not Updated';
			Logger.error(`[DATABASE ERROR]: ${response}`);
			throw new Error(response)
		}
		return uStatus
	}
};

const deleteStatus = {
	type: StatusType,
	args: {
		_id: {
			name: '_id',
			type: new GraphQLNonNull(GraphQLString)
		}
	},
	resolve: async function (_, param) {
		const deleteStatus = await StatusModel.findByIdAndRemove(param._id)
		if (!deleteStatus) {
			const response = 'Status Not deleted';
			Logger.error(`[DATABASE ERROR]: ${response}`);
			throw new Error(response)
		}
		return deleteStatus
	}
};

module.exports = {createStatus, updateStatus, deleteStatus}
