const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const {Roles} = require('../middlewares/enums/model.enum');

const UserModelSchema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		uniqueCaseInsensitive: true,
		lowercase: true,
		dropDups: true,
		trim: true,
		match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
	},
	phoneNumber: {
		type: String,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true,
		enum: Object.values(Roles),
		default: 'CLIENT'
	},
	verified: {
		type: Boolean,
		required: true,
		default: true
	},
	token: {
		type: String
	}
}, {timestamps: true});

UserModelSchema.plugin(uniqueValidator);
const UserModel = mongoose.model('Users', UserModelSchema);

module.exports = UserModel;

