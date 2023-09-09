import dotenv from 'dotenv';
dotenv.config();

let config = {};

config = {
  server: process.env.PORT,
};

config.db = {
  cs: process.env.MONGO_URI,
};

config.jwt = {
  token: process.env.JWT_PRIVATE_KEY,
};

config.mail = {
    relay: process.env.relay,
    mailPort: process.env.mailPort,
    mailUser: process.env.mailUser,
    mailPass: process.env.mailPass

}

config.url = {
  baseUrl: process.env.baseUrl,
  recoverPassword: process.env.recoverPassword
}

export default config;
