import mongoose from "mongoose";

const { Schema } = mongoose;

const userCollection = "users"

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    cart: { type: Schema.Types.ObjectId, ref: 'cart' },
    role: { type: String, default: 'user' }
})

mongoose.set("strictQuery", false)
const UserModel = mongoose.model(userCollection, userSchema)

export default UserModel