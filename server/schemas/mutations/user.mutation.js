const bcrypt = require("bcrypt");
const moment = require("moment/moment");
const {GraphQLNonNull, GraphQLString} = require('graphql');
const UserType = require('../types/user.type');
const AuthType = require('../types/auth.type');
const UserModel = require('../../models/user.model');
const TokenModel = require('../../models/token.model');
const Logger = require('../../middlewares/utils/logger');
const Config = require('../../middlewares/enums/config.enum');
const AuthService = require('../../middlewares/services/auth.service');
const jwt = require("jsonwebtoken");


const login = {
	type: AuthType,
	args: {
		email: {
			name: 'email',
			type: new GraphQLNonNull(GraphQLString)
		},
		password: {
			name: 'password',
			type: new GraphQLNonNull(GraphQLString)
		},
	},
	resolve: async (root, params) => {
		const {password, email} = params;
		const userExist = await UserModel.findOne({email: email.toLowerCase()});
		if (!userExist) {
			const response = 'User resource or information Not found'
			Logger.error(`[FAILED]: ${response}`);
			throw new Error(response)
		} else {
			const isValid = await bcrypt.compare(password, userExist.password);
			if (!isValid) {
				const response = 'Invalid login credentials'
				Logger.error(`[FAILED]: ${response}`);
				throw new Error(response)
			} else {
				const signToken = AuthService.signToken({
					userId: userExist._id,
					role: userExist.role,
					verified: userExist.verified
				});
				const hours = moment().add(6, "hours");
				const update = {$set: {token: signToken, expireDate: hours, userId: userExist._id}};
				const options = {upsert: true, new: true, setDefaultsOnInsert: true};
				return  TokenModel.findByIdAndUpdate(userExist._id, update, options);
			}
		}
	}
};

const createUser = {
	type: UserType,
	args: {
		firstName: {
			name: 'firstName',
			type: new GraphQLNonNull(GraphQLString)
		},
		lastName: {
			name: 'lastName',
			type: new GraphQLNonNull(GraphQLString)
		},
		email: {
			name: 'email',
			type: new GraphQLNonNull(GraphQLString)
		},
		phoneNumber: {
			name: 'phoneNumber',
			type: new GraphQLNonNull(GraphQLString)
		},
		password: {
			name: 'password',
			type: new GraphQLNonNull(GraphQLString)
		},
	},
	resolve: async (root, params) => {
		const {password, ...rest} = params;
		const encryptedPassword = await bcrypt.hash(password, Config.BCRYPT_SALT_RATE);
		const uModel = new UserModel({...rest, password: encryptedPassword});
		const newUser = await uModel.save()
		if (!newUser) {
			const response = 'Could not save user'
			Logger.error(`[DATABASE ERROR]: ${response}`);
			throw new Error(response)
		} else {
			const signToken = await jwt.sign({
				userId: newUser._id,
				role: newUser.role,
				verified: newUser.verified
			}, process.env.TOKEN_KEY, {expiresIn: Config.JWT_EXPIRE_PERIOD});
			const hours = moment().add(6, "hours");
			const update = {$set: {token: signToken, expireDate: hours, userId: newUser._id}};
			const options = {upsert: true, new: true, setDefaultsOnInsert: true};
			await TokenModel.findByIdAndUpdate(newUser._id, update, options);
			
			return {
				...rest,
				_id: newUser._id,
				role: newUser.role,
				verified: newUser.verified,
				createdAt: newUser.createdAt,
				updatedAt: newUser.updatedAt,
			};
		}
	}
}

const updateUser = {
	type: UserType,
	args: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		firstName: {
			name: 'firstName',
			type: GraphQLString
		},
		lastName: {
			name: 'lastName',
			type: GraphQLString
		},
		email: {
			name: 'email',
			type: GraphQLString
		},
		phoneNumber: {
			name: 'phoneNumber',
			type: GraphQLString
		},
		password: {
			name: 'password',
			type: GraphQLString
		},
	},
	resolve: async (_, param) => {
		let updateUser = {};
		if (param.firstName) {
			updateUser.firstName = param.firstName
		}
		if (param.lastName) {
			updateUser.lastName = param.lastName
		}
		if (param.email) {
			updateUser.email = param.email
		}
		if (param.phoneNumber) {
			updateUser.phoneNumber = param.phoneNumber
		}
		const uUser = await UserModel.findByIdAndUpdate(param._id, updateUser, {new: true})
		if (!uUser) {
			const response = 'Could not save user'
			Logger.error(`[DATABASE ERROR]: ${response}`);
			throw new Error(response)
		} else {
			delete uUser.password;
			return {
				...uUser,
				createdAt: uUser.createdAt,
				updatedAt: uUser.updatedAt,
			};
		}
	}
};

const deleteUser = {
	type: UserType,
	args: {
		_id: {
			name: '_id',
			type: new GraphQLNonNull(GraphQLString)
		}
	},
	resolve: async function (_, param) {
		const deleteUser = await UserModel.findByIdAndDelete(param._id)
		if (!deleteUser) {
			throw new Error('Error');
		}
		return true;
	}
};

const toggleUserRole = {
	type: UserType,
	args: {
		_id: {
			name: '_id',
			type: new GraphQLNonNull(GraphQLString)
		}
	},
	resolve: async (_, param) => {
		const getUser = await UserModel.findById(param._id).exec()
		const newRole = getUser['role'] === Config.ADMIN ? Config.CLIENT : Config.ADMIN;
		const uUser = await UserModel.findByIdAndUpdate(param._id, {role: newRole}, {new: true});
		if (!uUser) {
			const response = 'Could not save user'
			Logger.error(`[DATABASE ERROR]: ${response}`);
			throw new Error(response)
		} else return uUser;
	},
};

const toggleUserVerify = {
	type: UserType,
	args: {
		_id: {
			name: '_id',
			type: new GraphQLNonNull(GraphQLString)
		}
	},
	resolve: async (_, param) => {
		const getUser = await UserModel.findById(param._id).exec()
		const uUser = await UserModel.findByIdAndUpdate(param._id, {verified: !getUser['verified']}, {new: true})
		if (!uUser) {
			const response = 'Could not save user'
			Logger.error(`[DATABASE ERROR]: ${response}`);
			throw new Error(response)
		} else return uUser;
	},
};

module.exports = {login, createUser, updateUser, deleteUser, toggleUserRole, toggleUserVerify}
