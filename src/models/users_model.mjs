import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  first_name: { type: String, required: true }, // String is shorthand for {type: String}
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserEntity = mongoose.model("user", userSchema);

export default UserEntity;
