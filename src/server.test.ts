import supertest from "supertest";

import { prismaMock } from "./lib/prisma/client.mock";

import app from "./app";

const request = supertest(app);

describe("GET /planets", () => {
    test("Valid request", async () => {
        const planets = [
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
});

//describe block here
describe("POST /planets", () => {
    test("Valid request", async () => {

        //this is what is coming back when we call that method.
        const planet = {
            id: 3,
            name: "Mercury",
            description: null,
            diameter: 223455,
            moons: 34,
            createdAt: "2023-01-16T22:16:17.269Z",
            updatedAt: "2023-01-16T22:16:17.269Z",
        };

        //@ts-ignore
        prismaMock.planet.create.mockResolvedValue(planet);

        const response = await request
            .post("/planets")
            .send({ //this is what gets sent back out
                name: "Mercury",
                diameter: 223455,
                moons: 34,
            })
            .expect(201)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(planet); //change what we're expecting here
    });

    //new test: invalid request
    test("Invalid request", async () => {
        const planet = {
            name: "Mercury",
            diameter: 223455,
            moons: 34,
        };

        const response = await request
            .post("/planets")
            .send(planet) //need the data to be posted .send(planet) with planet object
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array),
            },
        });
    });
});
