import Joi from "joi";
import sendResponse from "../utils/replyHandler.mjs";
import {
  getDoctorDetailsService,
  registerDoctorService,
  removeDoctorService,
  updateDoctorDetailsService,
} from "../services/doctor_service.mjs";

export async function registerDoctor(req, reply) {
  try {
    const validationSchema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
      first_name: Joi.string().pattern(new RegExp("^[a-zA-Z]")).required(),
      last_name: Joi.string().pattern(new RegExp("^[a-zA-Z]")).required(),
      experience_years: Joi.number().required(),
      role: Joi.string().required(),
      qualification: Joi.string().required(),
    });

    const { error, value } = validationSchema.validate(req.body);

    if (error) {
      return sendResponse(reply, false, 400, error.message, {}, {});
    }

    const saveData = await registerDoctorService(value);

    if (saveData.error) {
      return sendResponse(reply, false, 400, error.message, {}, {});
    }

    return sendResponse(reply, true, 201, "success", saveData.data);
  } catch (err) {
    console.log(err);
    return sendResponse(reply, false, 500, err.message);
  }
}

export async function updateDoctorDetails(req, reply) {
  try {
    const validationSchema = Joi.object({
      first_name: Joi.string().pattern(new RegExp("^[a-zA-Z]")),
      last_name: Joi.string().pattern(new RegExp("^[a-zA-Z]")),
      experience_years: Joi.number(),
      role: Joi.string(),
      qualification: Joi.string(),
      id: Joi.string().required(),
      is_active: Joi.boolean(),
    });

    const { error, value } = validationSchema.validate({ ...req.body, ...req.params });

    if (error) {
      return sendResponse(reply, false, 400, error.message, {}, {});
    }

    const updateDetails = await updateDoctorDetailsService(value);

    return sendResponse(
      reply,
      updateDetails.error,
      updateDetails.statusCode,
      updateDetails.message,
      updateDetails.data
    );
  } catch (err) {
    console.log(err);
    return sendResponse(reply, false, 500, err.message);
  }
}

export async function removeDoctor(req, reply) {
  try {
    const validationSchema = Joi.object({
      id: Joi.string().required(),
    });

    const { error, value } = validationSchema.validate({ ...req.params });

    if (error) {
      return sendResponse(reply, false, 400, error.message, {}, {});
    }

    const removeDoctor = await removeDoctorService(value.id);

    return sendResponse(reply, removeDoctor.error, removeDoctor.statusCode, removeDoctor.message);
  } catch (err) {
    console.log(err);
    return sendResponse(reply, false, 500, err.message);
  }
}

export async function getDoctorDetails(req, reply) {
  try {
    const validationSchema = Joi.object({
      id: Joi.string().required(),
    });

    const { error, value } = validationSchema.validate({ ...req.params });

    if (error) {
      return sendResponse(reply, false, 400, error.message, {}, {});
    }

    const getDoctor = await getDoctorDetailsService(value.id);

    return sendResponse(
      reply,
      getDoctor.error,
      getDoctor.statusCode,
      getDoctor.message,
      getDoctor.data
    );
  } catch (err) {
    console.log(err);
    return sendResponse(reply, false, 500, err.message);
  }
}
