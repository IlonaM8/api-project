import express from "express";
import "express-async-errors";



import { ValidationErrorMiddleware } from "./lib/middleware/validation";

import { initCorsMiddleware } from "./lib/middleware/cors"

import planetsRoute from "./routes/planets";



const app = express();

//midleware
app.use(express.json());

//cors middleware
app.use(initCorsMiddleware());

//routes after the cors middleware
app.use("/planets", planetsRoute);

//after all the routes - run the middleware
app.use(ValidationErrorMiddleware);

export default app;
