import express from "express";
import "express-async-errors";
import cors from "cors";

import { ValidationErrorMiddleware } from "./lib/validation"

import planetsRoute from "./routes/planets"




//cors options: allow only this web page to make a request to out API
const corsOptions = {
    origin: "http://localhost:8080"
}

const app = express();



//midleware
app.use(express.json());

//cors middleware
app.use(cors(corsOptions));


//routes after the cors middleware
app.use("/planets", planetsRoute);


//after all the routes - run the middleware
app.use(ValidationErrorMiddleware);

export default app;









