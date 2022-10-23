const Roles = Object.freeze({
	ADMIN: 'ADMIN',
	CLIENT: 'CLIENT',
});

const TaskStatus = Object.freeze({
	TODO: 'TODO',
	PROGRESS: 'PROGRESS',
	REVIEW: 'REVIEW',
	QA: 'QA',
	CERTIFIED: 'CERTIFIED'
});

const TaskPriority = Object.freeze({
	HIGHEST: 'HIGHEST',
	HIGH: 'HIGH',
	MEDIUM: 'MEDIUM',
	LOW: 'LOW',
	LOWEST: 'LOWEST'
});


module.exports = {Roles, TaskStatus, TaskPriority};

