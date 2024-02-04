import { registerUser, loginUser } from "../controllers/auth_controller.mjs";

function authRoutes(fastify, options, done) {
  fastify.post("/register", registerUser);
  fastify.post("/login", loginUser);
  fastify.get("/", { preHandler: [fastify.authenticate] }, (req, reply) => {
    return reply.code(200).send("hellow");
  });

  done();
}

export default authRoutes;
