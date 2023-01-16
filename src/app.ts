import express from "express";
import "express-async-errors";
import prisma from "./lib/prisma/client";

const app = express();

//transform the json string into a js object we can use here
app.use(express.json());


app.get("/planets", async (request, response) => {

   const planets = await prisma.planet.findMany();

   response.json(planets);
});

//here is the new root
app.post("/planets", async (request, response) => {

    const planet = request.body;

    response.status(201).json(planet);
 });

export default app;
