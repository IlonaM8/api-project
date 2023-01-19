import supertest from "supertest";
import app from './app';

const request = supertest(app);

test("GET /planets", async() => {
    const response = await request
    .get("/planets")
    .expect(200)
    .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual([
        { name: "Mercury" },
        { name: "Venus" }
    ]);
})



//making a test POST for 'creating something new'
test("POST /planets", async() => {
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

