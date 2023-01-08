import * as fs from "node:fs/promises";

fs.readFile("file-1.txt", { encoding: "utf-8"}).then(
    function (data){
        console.log("data:", data);
    },
    function (error) {
        console.error(error);
    },
)
