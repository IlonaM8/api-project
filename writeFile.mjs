import * as fs from "node:fs";



fs.writeFile("myFile.txt", "Hello, this is my text file", "utf-8", function(error, data){
    if(error){
        console.log(error);
        return;
    }

    console.log("Your text file is complete")
})
