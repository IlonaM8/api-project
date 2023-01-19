import express from "express";
import "express-async-errors";
import { PrismaClient } from "@prisma/client";

const app = express();

//new instance of prisma client
const prisma = new PrismaClient();


app.get("/planets", async (request, response) => {
    const planets = await prisma.planet.findMany();

    response.json(planets);

});

export default app;




/* Here is the respose from POSTMAN with all the planets from the databse:

[
    {
        "id": 1,
        "name": "Mercury",
        "description": "planet in our system",
        "diameter": 223455,
        "moons": 34,
        "createdAt": "2023-01-16T12:27:38.321Z",
        "updatedAt": "2023-01-16T12:28:47.863Z"
    },
    {
        "id": 2,
        "name": "Venus",
        "description": null,
        "diameter": 3344,
        "moons": 33,
        "createdAt": "2023-01-16T12:29:02.141Z",
        "updatedAt": "2023-01-16T12:28:49.614Z"
    },
    {
        "id": 3,
        "name": "Mercury",
        "description": null,
        "diameter": 223455,
        "moons": 34,
        "createdAt": "2023-01-16T22:16:17.269Z",
        "updatedAt": "2023-01-16T22:16:17.269Z"
    }
]









*/
