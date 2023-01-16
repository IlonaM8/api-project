import supertest from "supertest";

import { prismaMock } from "./lib/prisma/client.mock";

import app from "./app";

const request = supertest(app);

test("GET /planets", async () => {
    const planets = [
        //set what we're expecting to come back
        {
            id: 1,
            name: "Mercury",
            description: "planet in our system",
            diameter: 223455,
            moons: 34,
            createdAt: "2023-01-16T12:27:38.321Z",
            updatedAt: "2023-01-16T12:28:47.863Z",
        },
        {
            id: 2,
            name: "Venus",
            description: null,
            diameter: 3344,
            moons: 33,
            createdAt: "2023-01-16T12:29:02.141Z",
            updatedAt: "2023-01-16T12:28:49.614Z",
        },
    ];

    //@ts-ignore
    prismaMock.planet.findMany.mockResolvedValue(planets); //we're passing this planets array as the mock value

    const response = await request
        .get("/planets")
        .expect(200)
        .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual(planets); //change what we're expecting here
});


test("POST /planets", async () => {

    const planet = {
            name: "Mercury",
            diameter: 223455,
            moons: 34
    };


    const response = await request
        .post("/planets")
        .send(planet) //need the data to be posted .send(planet) with planet object
        .expect(201)
        .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual(planet); //change what we're expecting here
});
