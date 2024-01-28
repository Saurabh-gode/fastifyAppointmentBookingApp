import mongoose from "mongoose";
const { Schema } = mongoose;

const patientSchema = new Schema({
  name: { type: String, required: true },
  user_id: { type: Schema.ObjectId },
  patient_info: { type: Object },
});

const PatientEntity = mongoose.model("patient", patientSchema);

export default PatientEntity;
