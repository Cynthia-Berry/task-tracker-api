const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const ProjectModelSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
	},
	tasks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Tasks'
		}
	],
	users: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users'
		}
	],
	status: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ProjectStatus'
	},
}, {timestamps: true});

ProjectModelSchema.plugin(uniqueValidator);
const ProjectModel = mongoose.model('Projects', ProjectModelSchema);

module.exports = ProjectModel;

