import UserEntity from "../models/users_model.mjs";
import bcrypt from "bcrypt";
import { SALTROUNDS } from "../config/constants.mjs";

export async function registerUserService(data) {
  try {
    const hashedpassword = await bcrypt.hash(data.password, SALTROUNDS);

    const savedUser = await UserEntity.create({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: hashedpassword,
    });

    return { error: false, data: savedUser, statusCode: 201 };
  } catch (err) {
    console.log(err);

    if (err.code === 11000) {
      return { error: true, message: "email already in use", statusCode: 400 };
    }

    return { error: true, message: err.message, statusCode: 500 };
  }
}

export async function loginService({ email, password }) {
  try {
    const savedUser = await UserEntity.findOne({ email });

    console.log(savedUser);

    if (savedUser) {
      const passwordCheck = await bcrypt.compare(password, savedUser.password);

      if (passwordCheck) {
        const payload = {
          user_id: JSON.stringify(savedUser._id),
          first_name: savedUser.first_name,
          last_name: savedUser.last_name,
          email: savedUser.email,
        };

        // const access_token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 900 });

        return { error: false, message: "Login Success!", statusCode: 200, data: payload };
      } else {
        return { error: false, message: "incorrect credentials! try again..", statusCode: 400 };
      }
    } else {
      return { error: false, message: "user not found!", statusCode: 400 };
    }
  } catch (err) {
    console.log(err);
    return { error: true, message: err.message, statusCode: 500 };
  }
}

async function generateToken(payload) {
  try {
  } catch (err) {}
}
