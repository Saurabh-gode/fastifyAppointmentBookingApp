const schema = {
  type: "object",
  required: ["JWT_SECRET"],
  properties: {
    JWT_SECRET: {
      type: "string",
    },
  },
};

const envSchema = {
  dotenv: true,
  data: process.env,
  schema,
};

export default envSchema;
