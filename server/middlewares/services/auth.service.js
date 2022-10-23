const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Config = require('../enums/config.enum')

const AuthService = {
	hashPassword:  (password) => {
		return  bcrypt.hash(password, Config.BCRYPT_SALT_RATE);
	},
	
	verifyPassword: async (hash, password) => {
		return await bcrypt.compare(hash, password);
	},
	
	signToken: data => {
		return jwt.sign(data, process.env.TOKEN_KEY, {expiresIn: Config.JWT_EXPIRE_PERIOD});
	},
	
	verifyToken: token => {
		return jwt.verify(token, process.env.TOKEN_KEY, {});
	}
	
}

module.exports = AuthService;
