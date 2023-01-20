import supertest from "supertest";
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
            {
                id: 6,
                name: "TOI 700 b",
                description: null,
                diameter: 7581,
                moons: 1,
                createdAt: "2023-01-19T15:27:43.209Z",
                updatedAt: "2023-01-19T15:27:43.209Z",
            },
            {
                id: 7,
                name: "TOI 700 b",
                description: null,
                diameter: 7581,
                moons: 1,
                createdAt: "2023-01-19T15:39:00.804Z",
                updatedAt: "2023-01-19T15:39:00.804Z",
            },
            {
                id: 8,
                name: "TOI 700 b",
                description: null,
                diameter: 7581,
                moons: 1,
                createdAt: "2023-01-19T15:40:38.121Z",
                updatedAt: "2023-01-19T15:40:38.121Z",
            },
            {
                id: 9,
                name: "TOI 700 b",
                description: null,
                diameter: 7581,
                moons: 1,
                createdAt: "2023-01-19T15:43:28.073Z",
                updatedAt: "2023-01-19T15:43:28.073Z",
            },
            {
                id: 10,
                name: "TOI 700 b",
                description: null,
                diameter: 7581,
                moons: 1,
                createdAt: "2023-01-19T15:47:21.537Z",
                updatedAt: "2023-01-19T15:47:21.537Z",
            },
            {
                id: 5,
                name: "TOI 700 b",
                description:
                    "TOI-700 b is a super Earth exoplanet that orbits an M-type star. Its mass is 1.11 Earths, it takes 10 days to complete one orbit of its star",
                diameter: 7581,
                moons: 1,
                createdAt: "2023-01-19T14:35:08.888Z",
                updatedAt: "2023-01-19T16:23:56.152Z",
            },
            {
                id: 11,
                name: "TOI 700 b",
                description: null,
                diameter: 7581,
                moons: 1,
                createdAt: "2023-01-19T17:12:53.961Z",
                updatedAt: "2023-01-19T17:12:53.961Z",
            },
            {
                id: 12,
                name: "TOI 700 b",
                description: null,
                diameter: 7581,
                moons: 1,
                createdAt: "2023-01-19T17:14:04.356Z",
                updatedAt: "2023-01-19T17:14:04.356Z",
            },
        ];

        const response = await request
            .get("/planets")
            .expect(200)
            .expect("Content-Type", /application\/json/)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");

        expect(response.body).toEqual(planets);
    });
});

describe("POST /planets", () => {
    test("Valid request", async () => {
        const planet = {
            name: "TOI 700 b",
            diameter: 7581,
            moons: 1,
        };

        const response = await request
            .post("/planets")
            .send(planet)
            .expect(201) //response 201 - something new is being created
            .expect("Content-Type", /application\/json/)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");

        expect(response.body).toEqual(planet);
    });

    test("Invalid request", async () => {
        const planet = {
            diameter: 7.581,
            moons: 1,
        };

        const response = await request
            .post("/planets")
            .send(planet)
            .expect(422) //response 422 - something in the structure wasn't correct
            .expect("Content-Type", /application\/json/);

        //we're not expecting a succcessful response but an object with an errors propertiy - containing a body property - containing an array of errors.
        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array),
            },
        });
    });
});

// new route to get a single planet
describe("GET /planet/:id", () => {
    test("Valid request", async () => {
        const planet = {
            name: "TOI 700 b",
            diameter: 7581,
            moons: 1,
        };

        const response = await request
            .post("/planets/5")
            .send(planet)
            .expect(200) //response 201 - something new is being created
            .expect("Content-Type", /application\/json/)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");

        expect(response.body).toEqual(planet);
    });

    //error test for a specific request
    test("Planet does not exist", async () => {
        const response = await request
            .get("/planets/56")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot GET /planets/56");
    });

    test("Invalid Planet ID", async () => {
        const response = await request
            .get("/planets/asdf")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot GET /planets/asdf");
    });
});

//Update a planet
describe("PUT /planets/:id", () => {
    test("Valid request", async () => {
        const planet = {
            id: 5,
            name: "TOI 700 b",
            description:
                "TOI-700 b is a super Earth exoplanet that orbits an M-type star. Its mass is 1.11 Earths, it takes 10 days to complete one orbit of its star",
            diameter: 7581,
            moons: 1,
        };

        const response = await request
            .put("/planets/5")
            .send({
                id: 5,
                name: "TOI 700 b",
                description:
                    "TOI-700 b is a super Earth exoplanet that orbits an M-type star. Its mass is 1.11 Earths, it takes 10 days to complete one orbit of its star",
                diameter: 7581,
                moons: 1,
            })
            .expect(200) //response 201 - something new is being created
            .expect("Content-Type", /application\/json/)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");

        expect(response.body).toEqual(planet);
    });

    test("Invalid request", async () => {
        const planet = {
            diameter: 7.581,
            moons: 1,
        };

        const response = await request
            .put("/planets/34")
            .send(planet)
            .expect(422) //response 422 - something in the structure wasn't correct
            .expect("Content-Type", /application\/json/);

        //we're not expecting a succcessful response but an object with an errors propertiy - containing a body property - containing an array of errors.
        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array),
            },
        });
    });

    test("Planet does not exist", async () => {
        const response = await request
            .put("/planets/56")
            .send({
                name: "TOI 700 b",
                description:
                    "TOI-700 b is a super Earth exoplanet that orbits an M-type star. Its mass is 1.11 Earths, it takes 10 days to complete one orbit of its star",
                diameter: 7581,
                moons: 1,
            })
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot PUT /planets/56");
    });

    test("Invalid Planet ID", async () => {
        const response = await request
            .put("/planets/asdf")
            .send({
                id: 5,
                name: "TOI 700 b",
                description:
                    "TOI-700 b is a super Earth exoplanet that orbits an M-type star. Its mass is 1.11 Earths, it takes 10 days to complete one orbit of its star",
                diameter: 7581,
                moons: 1,
            })
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot PUT /planets/asdf");
    });
});

// Delete a planet
describe("DELETE /planets/:id", () => {
    test("Valid request", async () => {
        const response = await request
        .delete("/planets/5")
        .expect(204) //response 204 - no content
        .expect("Access-Control-Allow-Origin", "http://localhost:8080");

        expect(response.text).toEqual("");
    });

    //error test for a specific request
    test("Planet does not exist", async () => {
        const response = await request
            .delete("/planets/56")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot DELETE /planets/56");
    });

    test("Invalid Planet ID", async () => {
        const response = await request
            .delete("/planets/asdf")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot DELETE /planets/asdf");
    });
});

/**
 * These tests depend on: src/lib/middleware/multer.mock.ts
 * It uses multer.memoryStorage, so no files are written to disk.
 */


//test routes that can accept file uploads
describe("POST /planets/:id/photo", () => {
    test("Valid request with PNG file upload", async () => {
        await request
        .post("/planets/23/photo")
        .attach("photo", "test-fixtures/photos/file.png")
        .expect(201)
        .expect("Access-Control-Allow-Origin", "http://localhost:8080");

    });

    test("Planet does not exist", async () => {
        //@ts-ignore
        prismaMock.planet.update.mockRejectedValue(new Error("Error"));

        const response = await request
        .post("/planets/23/photo")
        .attach("photo", "test-fixtures/photos/file.png")
        .expect(404)
        .expect("Content-Type",/text\/html/)

      expect(response.text).toContain("Cannot POST /planets/23/photo");


    })

 test("Invalid planet ID", async () => {
    const response = await request
    .post("/planets/asdf/photo")
    .expect(404)
    .expect("Content-Type", /text\/html/);

   expect(response.text).toContain("Cannot POST /planets/asdf/photo");
 });

 test("Invalid request with no file upload", async () => {
    const response = await request
    .post("/planets/11/photo")
    .expect(400) //client error - submitted a request with no photo
    .expect("Content-Type", /text\/html/);

   expect(response.text).toContain("Cannot POST /planets/asdf/photo");

 });


})
