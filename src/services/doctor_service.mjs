import DoctorEntity from "../models/doctors_model.mjs";
import bcrypt from "bcrypt";
import { SALTROUNDS } from "../config/constants.mjs";

export async function registerDoctorService({
  first_name,
  last_name,
  email,
  password,
  experience_years,
  role,
  qualification,
}) {
  try {
    const hashedpassword = await bcrypt.hash(password, SALTROUNDS);
    const saveDoctor = await DoctorEntity.create({
      first_name,
      last_name,
      email,
      password: hashedpassword,
      experience_years,
      role,
      qualification,
    });

    return { error: false, data: saveDoctor, statusCode: 201 };
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return { error: true, message: "email already in use", statusCode: 400 };
    }
    return { error: true, message: err.message };
  }
}

export async function updateDoctorDetailsService({
  first_name,
  last_name,
  email,
  experience_years,
  role,
  qualification,
  is_active,
  id,
}) {
  try {
    const updateDetails = await DoctorEntity.updateOne(
      { _id: id },
      {
        first_name,
        last_name,
        email,
        experience_years,
        role,
        qualification,
        is_active,
      }
    );

    // const data = await getDoctorDetailsService();

    return await getDoctorDetailsService(id);
  } catch (err) {
    console.log(err);
    return { error: true, message: err.message, statusCode: 500 };
  }
}

export async function removeDoctorService(id) {
  try {
    const removeDoctor = await DoctorEntity.deleteOne({ _id: id });

    return { error: false, message: "success", statusCode: 202 };
  } catch (err) {
    console.log(err);
    return { error: true, message: err.message, statusCode: 500 };
  }
}

export async function getDoctorDetailsService(id) {
  try {
    const getDoctor = await DoctorEntity.findById(id);

    return { error: false, message: "success", data: getDoctor, statusCode: 200 };
  } catch (err) {
    cconsole.log(err);
    return { error: true, message: err.message, statusCode: 200 };
  }
}
