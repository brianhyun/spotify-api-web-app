const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	auth_endpoint: process.env.AUTH_ENDPOINT,
	client_id: process.env.CLIENT_ID, 
	redirect_uri: process.env.REDIRECT_URI,
	port: process.env.PORT
}