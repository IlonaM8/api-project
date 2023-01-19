import express from "express";
import "express-async-errors";
import { PrismaClient } from "@prisma/client";

import { validate, ValidationErrorMiddleware, planetSchema, planetData } from "./lib/validation";


const app = express();

//new instance of prisma client
const prisma = new PrismaClient();

//midleware
app.use(express.json());

//get all resources from db
app.get("/planets", async (request, response) => {
    const planets = await prisma.planet.findMany();

    response.json(planets);

});

//creating a new route with POST method
// call validate() fun to validate the request body. The request body will be validated against the description in planetSchema
app.post("/planets", validate({ body: planetSchema }), async (request, response) => {
    const planetData: planetData = request.body; //if valid - should be type planetData

    //making a query to db using Prisma to save the data into db
    const planet = await prisma.planet.create({
        data: planetData
    });

    response.status(201).json(planet);

});


//after al the routes - run the middleware
app.use(ValidationErrorMiddleware);

export default app;



/* Vlaidation is working: this is the response from POSTMAN

{
    "errors": {
        "body": [
            {
                "instancePath": "",
                "schemaPath": "#/required",
                "keyword": "required",
                "params": {
                    "missingProperty": "name"
                },
                "message": "must have required property 'name'"
            }
        ]
    }
}

*/


/**
Here is the new planet created in our db
{
    "id": 5,
    "name": "TOI 700 b",
    "description": null,
    "diameter": 77581,
    "moons": 1,
    "createdAt": "2023-01-19T14:35:08.888Z",
    "updatedAt": "2023-01-19T14:35:08.888Z"
}





 */
