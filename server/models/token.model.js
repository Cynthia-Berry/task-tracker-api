const mongoose = require('mongoose');
const moment = require('moment');
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
	token: {
		type: String,
		required: true
	},
	expireDate: {
		type: Date,
		default: moment().add(1, "hour")
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Users'
	},
}, {timestamps: true});

TokenSchema.plugin(uniqueValidator);
const TokenModel = mongoose.model('Tokens', TokenSchema);

module.exports = TokenModel;
