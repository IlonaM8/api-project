import express from "express";
import "express-async-errors";

const app = express();


app.get("/", (request, response) => {
    response.send("This is the space API!!!!!!!!");
});

export default app;
