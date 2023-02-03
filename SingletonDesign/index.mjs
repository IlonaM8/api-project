import "./script1.mjs";
import "./script2.mjs";


import { counterInstance } from "./counter.mjs";

counterInstance.increment(); // the count is 1 because we call it once!

console.log("Count:", counterInstance.count);

//then the count is 3 because we have the share state - every call to increment is happend on the same instance
