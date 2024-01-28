import mongoose from "mongoose";
const { Schema } = mongoose;

const doctorSchema = new Schema({
  first_name: String, // String is shorthand for {type: String}
  last_name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  experience_years: { type: Number, required: true },
  role: { type: String, default: null },
  qualification: { type: String, default: "M.D." },
});

const DoctorEntity = mongoose.model("doctor", doctorSchema);

export default DoctorEntity;
