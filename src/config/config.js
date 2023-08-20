import dotenv from 'dotenv';
dotenv.config();

const config = {
    server: process.env.PORT,
    db: {
        cs: process.env.MONGO_URI
    },

};

export default config;