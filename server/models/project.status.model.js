const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const ProjectStatusModelSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
}, {timestamps: true});

ProjectStatusModelSchema.plugin(uniqueValidator);
const ProjectStatusModel = mongoose.model('ProjectStatus', ProjectStatusModelSchema);

module.exports = ProjectStatusModel;

