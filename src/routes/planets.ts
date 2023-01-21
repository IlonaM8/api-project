import express, { Router } from "express";

import { PrismaClient } from "@prisma/client";

import {
    validate,
    planetSchema,
    planetData,
} from "../lib/middleware/validation";

//import multer middleware here
import { initMulterMiddleware } from "../lib/middleware/multer";

//new instance of prisma client
const prisma = new PrismaClient();

//new instance
const upload = initMulterMiddleware();

const router = Router();

//get all resources from db
router.get("/", async (request, response) => {
    const planets = await prisma.planet.findMany();

    response.json(planets);
});

//creating a new route with POST method
// call validate() fun to validate the request body. The request body will be validated against the description in planetSchema
router.post(
    "/",
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
router.get("/:id(\\d+)", async (request, response, next) => {
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
router.put(
    "/:id(\\d+)",
    validate({ body: planetSchema }),
    async (request, response, next) => {
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
router.delete("/:id(\\d+)", async (request, response, next) => {
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
router.post(
    "/:id(\\d+)/photo",
    upload.single("photo"),
    async (request, response, next) => {
        //console.log("request.file", request.file);

        if (!request.file) {
            response.status(400);
            return next("No photo file uploaded.");
        }

        const planetId = Number(request.params.id);
        const photoFilename = request.file.filename;

        try {
            await prisma.planet.update({
                where: { id: planetId },
                data: { photoFilename },
            });
        } catch (error) {
            response.status(404);
            next(`Cannot POST /planets/${planetId}/photo`);
        }

        response.status(201).json({ photoFilename });
    }
);

router.use("/photos", express.static("uploads"));

export default router;
