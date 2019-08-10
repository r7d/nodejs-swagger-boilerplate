import swaggerTools from "oas-tools";
import jsYaml from "js-yaml";
import fs from "fs";
import path from "path";
import {Application} from "express";
import logger from "./../logger";

export const initSwaggerMiddlware = async function (app: Application): Promise<void> {
    var spec = fs.readFileSync(path.join(__dirname, "./../../definition/swagger.yaml"), "utf8");
    var swaggerDoc = jsYaml.safeLoad(spec);
    
    const options = {
        controllers: path.join(__dirname, "./../../controllers"),
        checkControllers: true,
        customErrorHandling: logger,
        strict: true,
        router: true,
        validator: true,
        docs: {
            apiDocs: "/api-docs",
            apiDocsPrefix: "",
            swaggerUi: "/docs",
            swaggerUiPrefix: ""
        },
        // oasSecurity: false,
        // securityFile: {
        //     // your security settings
        // },
        // oasAuth: false,
        // grantsFile: {
        //     // your authorization settings
        // },
        ignoreUnknownFormats: true
    };
    
    swaggerTools.configure(options);

    await new Promise(resolve => {
        swaggerTools.initialize(swaggerDoc, app, function(err: Error) {
            if (err) {
                console.log("init middleware inner", err);
                process.exit(1);        
            }
            resolve();
        });
    });
};