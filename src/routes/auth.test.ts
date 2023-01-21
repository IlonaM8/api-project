import supertest from "supertest";

import  app  from "../app";


const request = supertest(app);


//test for login route
describe('GET /auth/login', () => {
    test("Valid request", async () => {
        await request
        .get("/auth/login?redirectTo=http://website.com")
        .expect(302) //redirect status
        .expect("Location", "/auth/github/login")
        .expect("Set-Cookie", /^connect.sid=/)
        .expect("Access-Control-Allow-Origin", "http://localhost:8080")
        .expect("Access-Control-Allow-Credentials", "true");
    });

    test("Invalid request", async () => {
        const response = await request
        .get("/auth/login") //if we forget the redirect query parameter it would be invalid
        .expect(400) //something wrong status
        .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Missing redirectTo query string parameter");
    });
 });


 //test for logout
 describe('GET /auth/logout', () => {
    test("Valid request", async () => {
        await request
        .get("/auth/login?redirectTo=http://website.com")
        .expect(302) //redirect status
        .expect("Location", "http://website.com")
        .expect("Set-Cookie", /^connect.sid=/)
        .expect("Access-Control-Allow-Origin", "http://localhost:8080")
        .expect("Access-Control-Allow-Credentials", "true");
    });

    test("Invalid request", async () => {
        const response = await request
        .get("/auth/logout")
        .expect(400) //something wrong status
        .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Missing redirectTo query string parameter");
    });
 });

//test for auth github login
 describe('GET /auth/github/login', () => {
    test("Valid request", async () => {
        await request
        .get("/auth/github/callback")
        .expect(302) //redirect status
        .expect("Location", /^https:\/\/github.com\/login\/oauth\/authorize/) //handling by gihub passport
        .expect("Access-Control-Allow-Origin", "http://localhost:8080")
        .expect("Access-Control-Allow-Credentials", "true");
    });
 });

 //
 describe('GET /auth/github/callback', () => {
    test("Valid request", async () => {
        await request
        .get("/auth/github/callback")
        .expect(302) //redirect status
        .expect("Location", /^https:\/\/github.com\/login\/oauth\/authorize/)
        .expect("Access-Control-Allow-Origin", "http://localhost:8080")
        .expect("Access-Control-Allow-Credentials", "true");
    });
 });
