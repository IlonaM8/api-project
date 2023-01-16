import express from "express";
import "express-async-errors";
import prisma from "./lib/prisma/client";

//update to incluede the planet schema and planet dara type:
import { validate,
         ValidationErrorMiddleware,
         planetSchema,
         PlanetData
        } from "./lib/validation";

const app = express();

//transform the json string into a js object we can use here
app.use(express.json());


app.get("/planets", async (request, response) => {

   const planets = await prisma.planet.findMany();

   response.json(planets);
});

//here is the new root
app.post("/planets",validate({ body: planetSchema }), async (request, response) => {
    const planet: PlanetData = request.body;

    response.status(201).json(planet);
 });

//if there is an error it will come in here
 app.use(ValidationErrorMiddleware)
export default app;
