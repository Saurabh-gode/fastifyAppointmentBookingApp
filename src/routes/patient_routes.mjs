import {
  registerPatient,
  removePatient,
  updatePatientDetails,
  getPatientDetails,
} from "../controllers/patient_controller.mjs";

function patient_routes(fastify, options, done) {
  fastify.get("/:id", { preHandler: [fastify.authenticate] }, getPatientDetails);
  fastify.post("/register", { preHandler: [fastify.authenticate] }, registerPatient);
  fastify.patch("/:id", { preHandler: [fastify.authenticate] }, updatePatientDetails);
  fastify.delete("/:id", { preHandler: [fastify.authenticate] }, removePatient);
  done();
}

export default patient_routes;
