const {GraphQLList, GraphQLString, GraphQLNonNull} = require('graphql');
const UserType = require('../types/user.type');
const UserModel = require('../../models/user.model');
const Config = require('../../middlewares/enums/config.enum');

const getAllUsers = {
	type: new GraphQLList(UserType),
	description: "List of all Users",
	resolve: () => {
		return UserModel.find().exec();
	}
};

const getAllAdmins = {
	type: new GraphQLList(UserType),
	description: "List of all Admins",
	resolve: () => {
		return UserModel.find({role: Config.ADMIN}).exec();
	}
};

const getAllClients = {
	type: new GraphQLList(UserType),
	description: "List of all Clients",
	resolve: () => {
		return UserModel.find({role: Config.CLIENT}).exec();
	}
};

const getUsersById = {
	type: UserType,
	description: "Fetch a User by Id",
	args: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
	},
	resolve: (root, param) => {
		return UserModel.findById(param._id).exec();
	}
};

const getAdminById = {
	type: UserType,
	description: "Fetch an Admin by Id",
	args: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
	},
	resolve: (root, param) => {
		return UserModel.findOne({_id: param._id, role: Config.ADMIN}).exec()
	}
};

const getClientById = {
	type: UserType,
	description: "Fetch a Client by Id",
	args: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
	},
	resolve: (root, param) => {
		return UserModel.findOne({_id: param._id, role: Config.ADMIN}).exec();
	}
};

module.exports = {getAllUsers, getAllAdmins, getAllClients, getUsersById, getAdminById, getClientById}
