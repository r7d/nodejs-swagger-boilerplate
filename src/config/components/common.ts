import joi from "@hapi/joi";

const envVarsSchema = joi.object({
    NODE_ENV: joi.string()
        .allow(["development", "production"])
        .default("development")
})
    .unknown()
    .required();
  
const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
    env: envVars.NODE_ENV,
    correlationId: {
        headerName: "x-correlation-id"
    }
};