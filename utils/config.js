const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	auth_endpoint: process.env.AUTH_ENDPOINT,
	client_id: process.env.CLIENT_ID, 
	port: process.env.PORT
}