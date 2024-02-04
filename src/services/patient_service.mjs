import PatientEntity from "../models/patient_model.mjs.mjs";

export async function registerPatientService({ name, address, email, contact_phone }) {
  try {
    const savePatient = await PatientEntity.create({
      name,
      address,
      email,
      contact_phone,
    });

    return { error: false, data: savePatient, statusCode: 201 };
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return { error: true, message: "email already in use", statusCode: 400 };
    }
    return { error: true, message: err.message };
  }
}

export async function updatePatientDetailsService({
  name,
  address,
  email,
  contact_phone,
  is_active,
  id,
}) {
  try {
    const updateDetails = await PatientEntity.updateOne(
      { _id: id },
      {
        name,
        address,
        email,
        contact_phone,
        is_active,
      }
    );

    // const data = await getPatientDetailsService();

    return await getPatientDetailsService(id);
  } catch (err) {
    console.log(err);
    return { error: true, message: err.message, statusCode: 500 };
  }
}

export async function removePatientService(id) {
  try {
    const removePatient = await PatientEntity.deleteOne({ _id: id });

    return { error: false, message: "success", statusCode: 202 };
  } catch (err) {
    console.log(err);
    return { error: true, message: err.message, statusCode: 500 };
  }
}

export async function getPatientDetailsService(id) {
  try {
    const getPatient = await PatientEntity.findById(id);

    return { error: false, message: "success", data: getPatient, statusCode: 200 };
  } catch (err) {
    cconsole.log(err);
    return { error: true, message: err.message, statusCode: 200 };
  }
}
