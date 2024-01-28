import mongoose from "mongoose";
const { Schema } = mongoose;

const clinicDoctorSchema = new Schema({
  clinic_id: { type: Schema.ObjectId },
  doctor_id: { type: Schema.ObjectId },
  availability_schedule_start: { type: Date },
  availability_schedule_end: { type: Date },
  is_available: { type: Boolean, default: false },
});

const ClinicDoctorEntity = mongoose.model("clinic_doctor", clinicDoctorSchema);

export default ClinicDoctorEntity;
