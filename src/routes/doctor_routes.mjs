import {
  registerDoctor,
  removeDoctor,
  updateDoctorDetails,
  getDoctorDetails,
} from "../controllers/doctor_controller.mjs";

function doctor_routes(fastify, options, done) {
  fastify.get("/:id", { preHandler: [fastify.authenticate] }, getDoctorDetails);
  fastify.post("/register", { preHandler: [fastify.authenticate] }, registerDoctor);
  fastify.patch("/:id", { preHandler: [fastify.authenticate] }, updateDoctorDetails);
  fastify.delete("/:id", { preHandler: [fastify.authenticate] }, removeDoctor);
  done();
}

export default doctor_routes;
