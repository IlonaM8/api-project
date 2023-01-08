import * as fs from "node:fs/promises";

fs.readFile("file-0.txt", { encoding: "utf-8"})
   .then(function (data){
        console.log("data:", data);
    })
    .catch(function (error) {
            console.error(error);
        });


        // this allows to add more promises.
        //next promise chain
        
