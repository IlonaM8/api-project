

import passport from "passport";
import passportGitHub2 from "passport-github2";
import config from "../../config";

const githubStrategy = new passportGitHub2.Strategy(
   {
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: config.GITHUB_CALLBACK_URL,
   },
   function (
    accessToken: string,
    refreshToken: string,
    profile: { [ key: string]: string; },
    done: (error: null, user: Express.User) => void
   ) {
     const user: Express.User = {
        username: profile.username,
    };
      done(null, user);
   }
);

passport.use(githubStrategy);

//will take the user data and store it in the session
passport.serializeUser<Express.User>((user, done) => done(null, user));

//takes the user data that was previously serialized and converts it back into a JavaScript object
passport.deserializeUser<Express.User>((user, done) => done(null, user));

export { passport };

