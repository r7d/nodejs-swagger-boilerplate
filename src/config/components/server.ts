import joi from "@hapi/joi";

const envVarsSchema = joi.object({
    SERVER_PORT: joi.number()
        .default(3000)
})
    .unknown()
    .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
    server: {
        port: envVars.SERVER_PORT
    }
};