import sendResponse from "../utils/replyHandler.mjs";
import { registerUserService, loginService } from "../services/auth_service.mjs";
import Joi from "joi";

// import
export async function registerUser(req, reply) {
  try {
    const validationSchema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
      first_name: Joi.string().pattern(new RegExp("^[a-zA-Z]")).required(),
      last_name: Joi.string().pattern(new RegExp("^[a-zA-Z]")).required(),
    });

    const { error, value } = validationSchema.validate(req.body);

    if (error) {
      return sendResponse(reply, false, 400, error.message, {}, {});
    }

    const saveUser = await registerUserService(value);

    if (saveUser.error) {
      return sendResponse(reply, false, saveUser.statusCode, saveUser.message || "failure");
    }

    return sendResponse(reply, true, 201, "success");
  } catch (err) {
    console.log(err);
    return sendResponse(reply, false, 500, err.message);
  }
}

export async function loginUser(req, reply) {
  try {
    const validationSchema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    });

    const { error, value } = validationSchema.validate(req.body);

    if (error) {
      return sendResponse(reply, false, 400, error.message, {}, {});
    }

    const loginUser = await loginService(value);

    const token = loginUser.data ? req.jwt.sign({ payload: loginUser.data, expiresIn: 900 }) : "";

    return sendResponse(
      reply,
      error,
      loginUser.statusCode,
      loginUser.message,
      { ...(token && { access_token: token }) },
      {}
    );
  } catch (err) {
    console.log(err, "ERR loginUser");
    return sendResponse(reply, false, 500, err.message);
  }
}
