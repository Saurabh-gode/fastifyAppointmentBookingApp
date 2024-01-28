import mongoose from "mongoose";
const { Schema } = mongoose;

const clinicSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  address: String,
  email: { type: String },
  contact_phone: { type: Number, max: 9999999999, min: 100000000 },
  ratings: { type: Number, default: 0.0 },
});

const ClinicEntity = mongoose.model("clinic", clinicSchema);

export default ClinicEntity;
