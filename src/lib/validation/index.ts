import addFormats from "ajv-formats";

import { ErrorRequestHandler } from "express";

import { Validator, ValidationError } from "express-json-validator-middleware";

//new instance of the validator class

const validator = new Validator({
    coerceTypes: true,
});

addFormats(validator.ajv, ["date-time"])
.addKeyword("kind")
.addKeyword("modifier");

export const validate = validator.validate;

export const ValidationErrorMiddleware: ErrorRequestHandler = (error, request, response, next) => {
    //if it is a validation error it will handle it here
    if(error instanceof ValidationError){
        response.status(422).send({
            errors: error.validationErrors
        });

        next(); //call the ext middleware

    }else{
        next(error);
    }

};

//export everything from planet schema type
export * from "./planet";
