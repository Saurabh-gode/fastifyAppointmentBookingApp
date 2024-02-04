import ClinicEntity from "../models/clinics_model.mjs";

export async function registerClinicService({ name, address, email, contact_phone }) {
  try {
    const saveClinic = await ClinicEntity.create({
      name,
      address,
      email,
      contact_phone,
    });

    return { error: false, data: saveClinic, statusCode: 201 };
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return { error: true, message: "email already in use", statusCode: 400 };
    }
    return { error: true, message: err.message };
  }
}

export async function updateClinicDetailsService({
  name,
  address,
  email,
  contact_phone,
  is_active,
  id,
}) {
  try {
    const updateDetails = await ClinicEntity.updateOne(
      { _id: id },
      {
        name,
        address,
        email,
        contact_phone,
        is_active,
      }
    );

    // const data = await getClinicDetailsService();

    return await getClinicDetailsService(id);
  } catch (err) {
    console.log(err);
    return { error: true, message: err.message, statusCode: 500 };
  }
}

export async function removeClinicService(id) {
  try {
    const removeClinic = await ClinicEntity.deleteOne({ _id: id });

    return { error: false, message: "success", statusCode: 202 };
  } catch (err) {
    console.log(err);
    return { error: true, message: err.message, statusCode: 500 };
  }
}

export async function getClinicDetailsService(id) {
  try {
    const getClinic = await ClinicEntity.findById(id);

    return { error: false, message: "success", data: getClinic, statusCode: 200 };
  } catch (err) {
    cconsole.log(err);
    return { error: true, message: err.message, statusCode: 200 };
  }
}
