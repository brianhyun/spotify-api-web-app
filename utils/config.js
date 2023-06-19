const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  auth_endpoint: process.env.AUTH_ENDPOINT,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uri:
    process.env.NODE_ENV !== "production"
      ? process.env.DEV_REDIRECT_URI
      : process.env.PROD_REDIRECT_URI,
  port: process.env.PORT,
  token_endpoint: process.env.TOKEN_ENDPOINT,
};
