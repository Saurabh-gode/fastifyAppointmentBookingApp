import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import fastifyEnv from "@fastify/env";
import fastifyJwt from "@fastify/jwt";
import mongoose from "mongoose";
import envSchema from "./config/envSchema.mjs";
import { authRoutes, doctor_routes, clinic_routes } from "./routes/index.mjs";

const PREFIX_BASE_URL = "/api/v1";

const fastify = Fastify();

await fastify.register(fastifyEnv, envSchema);
await fastify.register(cors);
await fastify.register(fastifyHelmet, { contentSecurityPolicy: false, global: true });
await fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET,
});

fastify.addHook("onRequest", (req, res, next) => {
  // here we are
  req.jwt = fastify.jwt;
  return next();
});

fastify.decorate("authenticate", async (req, reply) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return reply.status(401).send({ message: "Authentication required" });
  }
  // here decoded will be a different type by default but we want it to be of user-payload type
  const decoded = req.jwt.verify(authHeader);

  req.user = decoded;
});

//routes
fastify.get(`${PREFIX_BASE_URL}/`, (req, reply) =>
  reply.code(200).send({ message: "success", error: {}, statusCode: 200 })
);
fastify.register(authRoutes, { prefix: `${PREFIX_BASE_URL}/user` });
fastify.register(doctor_routes, { prefix: `${PREFIX_BASE_URL}/doctors` });
fastify.register(clinic_routes, { prefix: `${PREFIX_BASE_URL}/clinics` });

mongoose
  .connect(`mongodb://localhost:27017/app_db`)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connection failed", err));

fastify.listen({ port: 3005 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
  // fastify.log.info("Server is now listening on ${address}");
});
