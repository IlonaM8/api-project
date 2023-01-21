import session from "express-session";
import config from "../../config";

export function initSessionMiddleware() {
    return session({
        secret: config.SESSION_SECRET,  //this will be used to encrypt the session cookies :)
        resave: false,
        saveUninitialized: false,
    })
}












/*
Notes:
when we create a new session - we send back a cookie from our api to the browser  - that contains the session ID.
The session iD must be encrypted - we want to generate a secret to encrypt with:

in the terminal:
node -e "console.log(crypto.randomBytes(32).toString('hex'))"

this will give a random value - save it in .env file.

*/
