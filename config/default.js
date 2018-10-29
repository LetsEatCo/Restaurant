const dotenv = require('dotenv');

dotenv.config();

const env = process.env.NODE_ENV;

const development = {
	app: {
		port: env.DEV_APP_PORT || 9090
	},
	api: {
		baseUrl: env.DEV_API_BASE_URL || 'http://localhost'
	}
};

const test = {
	app: {
		port: env.TEST_APP_PORT || 9090
	}
};

const config = {
	development,
	test
};

module.exports = config[env];
