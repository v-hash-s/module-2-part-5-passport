import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
