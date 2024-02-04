import {
  registerClinic,
  removeClinic,
  updateClinicDetails,
  getClinicDetails,
} from "../controllers/clinic_controller.mjs";

function clinic_routes(fastify, options, done) {
  fastify.get("/:id", { preHandler: [fastify.authenticate] }, getClinicDetails);
  fastify.post("/register", { preHandler: [fastify.authenticate] }, registerClinic);
  fastify.patch("/:id", { preHandler: [fastify.authenticate] }, updateClinicDetails);
  fastify.delete("/:id", { preHandler: [fastify.authenticate] }, removeClinic);
  done();
}

export default clinic_routes;
