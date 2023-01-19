import supertest from "supertest";
import app from './app';

const request = supertest(app);

describe("GET /planets", () => {
test("Valid request", async() => {
    const response = await request
    .get("/planets")
    .expect(200)
    .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual([
        { name: "Mercury" },
        { name: "Venus" }
    ]);
})
})


describe("POST /planets", () => {
test("Valid request", async() => {
     const planet = {
        name: "TOI 700 b",
        diameter: 7.581,
        moons: 1
    };


    const response = await request
    .post("/planets")
    .send(planet)
    .expect(201)  //response 201 - something new is being created
    .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual(planet);
});



test("Invalid request", async() => {
    const planet = {
       diameter: 7.581,
       moons: 1
   };


   const response = await request
   .post("/planets")
   .send(planet)
   .expect(422)  //response 422 - something in the structure wasn't correct
   .expect("Content-Type", /application\/json/);

   //we're not expecting a succcessful response but an object with an errors propertiy - containing a body property - containing an array of errors.
   expect(response.body).toEqual({
    errors: {
        body: expect.any(Array)
    }
   });
});
})


