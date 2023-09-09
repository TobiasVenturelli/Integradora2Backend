import users from "../models/user.model.js";

const getUserByEmail = async(email) => await users.findOne({correo: email});

export {
     getUserByEmail
}