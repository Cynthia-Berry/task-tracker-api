require('dotenv').config();

const path = require('path');
const express = require('express');
const createError = require('http-errors');
const { graphqlHTTP } = require('express-graphql');

global.appRoot = path.resolve(__dirname);
global.appName = 'Tech Stars Tracker';
global.version = 'v1';
global.patchVersion = 'v1.0.0';

const app = express();
const port = process.env.PORT || 5000;

const Schema = require('./server/schemas/schemas');
require('./server/middlewares/utils/logger');
require('./server/config/database');


// set the req body (parses the body that comes with post/put requests )
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb', extended: true}));


// set headers (handling cors error)
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header("Accept", "application/json");
	res.header("Access-Control-Allow-Credentials", 'true');
	next();
});

app.use('/', graphqlHTTP({
		schema: Schema,
		graphiql: true,
	}),
);

app.listen(port, () =>
	console.log(`[${appName}]: Node Development Server is listening on localhost:${port}, open your browser on: http://localhost:${port}/`)
);

app.use((req, res, next) => {
	next(createError(404, 'This URL does not exist!'));
});
