import express from "express";
import "express-async-errors";

const app = express();


app.get("/planets", (request, response) => {

    const planets = [
        { name: "Mercury" },
        { name: "Venus" }
    ]; //it will be formated as a json


    //console.log( {planets} )
    // console.table(planets)

    // response.json(planets)
});

export default app;
