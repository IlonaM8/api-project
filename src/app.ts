import express from "express";
import "express-async-errors";
import { PrismaClient } from "@prisma/client";

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

//creating a new resource with POST method
app.post("/planets", async (request, response) => {
    const planet = request.body;

    response.status(201).json(planet);

});



export default app;


