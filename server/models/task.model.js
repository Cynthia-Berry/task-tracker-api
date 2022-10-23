const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const {TaskStatus, TaskPriority} = require("../middlewares/enums/model.enum");

const TaskModelSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
	},
	assignee: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Users'
	},
	reporter: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users'
	},
	dueDate: {
		type: Date,
		default: Date.now
	},
	priority: {
		type: String,
		required: true,
		default: 'MEDIUM',
		enum: Object.values(TaskPriority)
	},
	status: {
		type: String,
		required: true,
		default: 'TODO',
		enum: Object.values(TaskStatus)
	},
	comments: [
		{
			comment: {type: String},
			commentedBy: {type: String},
			commentedAt: {type: Date, default: Date.now}
		}
	]
}, {timestamps: true});

TaskModelSchema.plugin(uniqueValidator);
const TaskModel = mongoose.model('Tasks', TaskModelSchema);

module.exports = TaskModel;

