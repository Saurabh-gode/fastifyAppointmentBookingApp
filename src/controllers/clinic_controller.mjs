import Joi from "joi";
import sendResponse from "../utils/replyHandler.mjs";
import {
  getClinicDetailsService,
  registerClinicService,
  removeClinicService,
  updateClinicDetailsService,
} from "../services/clinic_service.mjs";

export async function registerClinic(req, reply) {
  try {
    const validationSchema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      name: Joi.string().pattern(new RegExp("^[a-zA-Z]")).required(),
      contact_phone: Joi.string()
        .regex(/^(\+\d{1,3}[- ]?)?\d{10}$/)
        .required(),
      address: Joi.string().required(),
    });

    const { error, value } = validationSchema.validate(req.body);

    if (error) {
      return sendResponse(reply, false, 400, error.message, {}, {});
    }

    const saveData = await registerClinicService(value);

    if (saveData.error) {
      return sendResponse(reply, false, 400, error.message, {}, {});
    }

    return sendResponse(reply, true, 201, "success", saveData.data);
  } catch (err) {
    console.log(err);
    return sendResponse(reply, false, 500, err.message);
  }
}

export async function updateClinicDetails(req, reply) {
  try {
    const validationSchema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      name: Joi.string().pattern(new RegExp("^[a-zA-Z]")).required(),
      address: Joi.string().required(),
      contact_phone: Joi.string().regex(/^(\+\d{1,3}[- ]?)?\d{10}$/),
      is_active: Joi.boolean(),
      id: Joi.string().required(),
    });

    const { error, value } = validationSchema.validate({ ...req.body, ...req.params });

    if (error) {
      return sendResponse(reply, false, 400, error.message, {}, {});
    }

    const updateDetails = await updateClinicDetailsService(value);

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

export async function removeClinic(req, reply) {
  try {
    const validationSchema = Joi.object({
      id: Joi.string().required(),
    });

    const { error, value } = validationSchema.validate({ ...req.params });

    if (error) {
      return sendResponse(reply, false, 400, error.message, {}, {});
    }

    const removeClinic = await removeClinicService(value.id);

    return sendResponse(reply, removeClinic.error, removeClinic.statusCode, removeClinic.message);
  } catch (err) {
    console.log(err);
    return sendResponse(reply, false, 500, err.message);
  }
}

export async function getClinicDetails(req, reply) {
  try {
    const validationSchema = Joi.object({
      id: Joi.string().required(),
    });

    const { error, value } = validationSchema.validate({ ...req.params });

    if (error) {
      return sendResponse(reply, false, 400, error.message, {}, {});
    }

    const getClinic = await getClinicDetailsService(value.id);

    return sendResponse(
      reply,
      getClinic.error,
      getClinic.statusCode,
      getClinic.message,
      getClinic.data
    );
  } catch (err) {
    console.log(err);
    return sendResponse(reply, false, 500, err.message);
  }
}
