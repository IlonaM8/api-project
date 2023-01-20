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
        diameter: 7581,
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

// new route to get a single planet
describe("GET /planet/:id", () => {
    test("Valid request", async() => {
        const planet = {
           name: "TOI 700 b",
           diameter: 7581,
           moons: 1
       };


       const response = await request
       .post("/planets/5")
       .send(planet)
       .expect(200)  //response 201 - something new is being created
       .expect("Content-Type", /application\/json/);

       expect(response.body).toEqual(planet);
   });

   //error test for a specific request
   test("Planet does not exist", async () => {

    const response = await request
          .get("/planets/56")
          .expect(404)
          .expect("Content-Type", /text\/html/);

    expect(response.text).toContain("Cannot GET /planets/56")

   });

   test("Invalid Planet ID", async () => {

    const response = await request
          .get("/planets/asdf")
          .expect(404)
          .expect("Content-Type", /text\/html/);

    expect(response.text).toContain("Cannot GET /planets/asdf")

   });

})

//Update a planet
describe("PUT /planets/:id", () => {
    test("Valid request", async() => {
         const planet = {
            id: 5,
            name: "TOI 700 b",
            description: "TOI-700 b is a super Earth exoplanet that orbits an M-type star. Its mass is 1.11 Earths, it takes 10 days to complete one orbit of its star" ,
            diameter: 7581,
            moons: 1
        };

        const response = await request
        .put("/planets/5")
        .send({
                id: 5,
                name: "TOI 700 b",
                description: "TOI-700 b is a super Earth exoplanet that orbits an M-type star. Its mass is 1.11 Earths, it takes 10 days to complete one orbit of its star" ,
                diameter: 7581,
                moons: 1
        })
        .expect(200)  //response 201 - something new is being created
        .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(planet);
    });



    test("Invalid request", async() => {
        const planet = {
           diameter: 7.581,
           moons: 1
       };


       const response = await request
       .put("/planets/34")
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


    test("Planet does not exist", async () => {

        const response = await request
              .put("/planets/56")
              .send({
                id: 5,
                name: "TOI 700 b",
                description: "TOI-700 b is a super Earth exoplanet that orbits an M-type star. Its mass is 1.11 Earths, it takes 10 days to complete one orbit of its star" ,
                diameter: 7581,
                moons: 1

              })
              .expect(404)
              .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot PUT /planets/56")

       });

       test("Invalid Planet ID", async () => {

        const response = await request
              .put("/planets/asdf")
              .send({
                id: 5,
                name: "TOI 700 b",
                description: "TOI-700 b is a super Earth exoplanet that orbits an M-type star. Its mass is 1.11 Earths, it takes 10 days to complete one orbit of its star" ,
                diameter: 7581,
                moons: 1

              })
              .expect(404)
              .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot PUT /planets/asdf")

       });
    })



// Delete a planet
    describe("DELETE /planets/:id", () => {
        test("Valid request", async() => {
           const response = await request
           .delete("/planets/5")
           .expect(204)  //response 204 - no content

           expect(response.text).toEqual("");
       });

       //error test for a specific request
       test("Planet does not exist", async () => {

        const response = await request
              .delete("/planets/56")
              .expect(404)
              .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot DELETE /planets/56")

       });

       test("Invalid Planet ID", async () => {

        const response = await request
              .delete("/planets/asdf")
              .expect(404)
              .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot DELETE /planets/asdf")

       });

    })
