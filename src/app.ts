import express from "express";
import "express-async-errors";



import { ValidationErrorMiddleware } from "./lib/middleware/validation";

import { initCorsMiddleware } from "./lib/middleware/cors"

import { initSessionMiddleware } from "./lib/middleware/session";
import { passport } from "./lib/middleware/passport";

import planetsRoute from "./routes/planets";



const app = express();

//It sets up the session store, and configure the options: sets up the session middleware and makes it available to the application so that it can be used to handle the user's session data
app.use(initSessionMiddleware());
//initialize passport middleware: sets up Passport and starts the authentication process for the user, allowing it to begin handling the user's authentication details and session management.
app.use(passport.initialize());
// retrieves the user object that was serialized and stored in the session. allows passport to use the session data to manage the user's authentication state, allowing it to keep track of whether or not the user is logged in and what their authentication details are.
app.use(passport.session());

//midleware
app.use(express.json());

//cors middleware
app.use(initCorsMiddleware());

//routes after the cors middleware
app.use("/planets", planetsRoute);

//after all the routes - run the middleware
app.use(ValidationErrorMiddleware);

export default app;
