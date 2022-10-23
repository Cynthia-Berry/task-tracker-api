const {mongoose} = require('mongoose');
const logger = require('../middlewares/utils/logger')

const options = {
	maxPoolSize: 10,
	autoIndex: false,
	keepAlive: true,
	useNewUrlParser: true,
	serverSelectionTimeoutMS: 5000,
	keepAliveInitialDelay: 30000
};

const MONGO_ATLAS_URL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.MONGODB_CLUSTER_SUFFIX}`;
module.exports = mongoose.connect(MONGO_ATLAS_URL, options, error => {
		if (error) logger.error(`Connection error to MongoDB Server. [Issue]: ${error}`);
		else logger.info(`[Database connection]: Connection to MongoDB server for ${appName} has been established successfully.`);
	}
);
