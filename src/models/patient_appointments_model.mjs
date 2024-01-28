import mongoose from "mongoose";
const { Schema } = mongoose;

const patientAppointmentSchema = new Schema({
  user_id: { type: Schema.ObjectId, required: true },
  patient_id: { type: Schema.ObjectId, required: true },
  doctor_id: { type: Schema.ObjectId, required: true },
  clinic_id: { type: Schema.ObjectId, required: true },
  schedule_start: { type: Date, required: true },
  schedule_end: { type: Date, required: true },
  appointment_status: {
    type: String,
    enum: ["booked", "confirmed", "completed", "unsuccessfull"],
    default: "booked",
  },
});

const PatientAppointmentsEntity = mongoose.model("patient", patientAppointmentSchema);

export default PatientAppointmentsEntity;
