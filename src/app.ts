import express from "express";
import "express-async-errors";
import cors from "cors";


import { PrismaClient } from "@prisma/client";

import {
    validate,
    ValidationErrorMiddleware,
    planetSchema,
    planetData,
} from "./lib/validation";

//import multer middleware here
import { initMulterMiddleware } from "./lib/middleware/multer";

//new instance
const upload = initMulterMiddleware();

//cors options: allow only this web page to make a request to out API
const corsOptions = {
    origin: "http://localhost:8080"
}

const app = express();

//new instance of prisma client
const prisma = new PrismaClient();

//midleware
app.use(express.json());

//cors middleware
app.use(cors(corsOptions));




//get all resources from db
app.get("/planets", async (request, response) => {
    const planets = await prisma.planet.findMany();

    response.json(planets);
});

//creating a new route with POST method
// call validate() fun to validate the request body. The request body will be validated against the description in planetSchema
app.post(
    "/planets",
    validate({ body: planetSchema }),
    async (request, response) => {
        const planetData: planetData = request.body; //if valid - should be type planetData

        //making a query to db using Prisma to save the data into db
        const planet = await prisma.planet.create({
            data: planetData,
        });

        response.status(201).json(planet);
    }
);

//create the route for the a single planet route
// pattern for a number (\\d+)
app.get("/planets/:id(\\d+)", async (request, response, next) => {
    const planetId = Number(request.params.id);

    const planet = await prisma.planet.findUnique({
        where: {
            id: planetId,
        },
    });

    //error handling for id that not does not exist
    if (!planet) {
        response.status(404);
        return next(`Cannot GET /planets/${planetId}`);
    }

    response.json(planet);
});

//route for update
app.put(
    "/planets/:id(\\d+)",validate({ body: planetSchema }), async (request, response, next) => {
        const planetId = Number(request.params.id);
        const planetData: planetData = request.body; //if valid - should be type planetData

        //making a query to db using Prisma to save the data into db
        try {
            const planet = await prisma.planet.update({
                where: { id: planetId },
                data: planetData,
            });

            response.status(200).json(planet);
        } catch (error) {
            response.status(404);
            next(`Cannot PUT /planets/${planetId}`);
        }
    }
);

// route for delete
app.delete("/planets/:id(\\d+)", async (request, response, next) => {
        const planetId = Number(request.params.id);

        try {
            await prisma.planet.delete({
                where: { id: planetId },
            });

            response.status(204).end();
        } catch (error) {
            response.status(404);
            next(`Cannot DELETE /planets/${planetId}`);
        }
    });


    //route for file uploads
    app.post("/planets/:id(\\d+)/photo",
    upload.single("photo"),
    async (request, response, next) => {
        console.log("request.file", request.file);

        if(!request.file){
            response.status(400);
            return next("No photo file uploaded.");
        }

        const planetId = Number(request.params.id);
        const photoFilename = request.file.filename;


        try{
            await prisma.planet.update({
                where: { id: planetId },
                data: { photoFilename }
            })
        }catch(error){
            response.status(404);
            next(`Cannot POST /planets/${planetId}/photo`);
        }


        response.status(201).json({ photoFilename});
    });



app.use("/planets/photos", express.static("uploads"));

//after all the routes - run the middleware
app.use(ValidationErrorMiddleware);

export default app;









