import * as fs from "node:fs/promises";

// fs.readFile("file-1.txt", { encoding: "utf-8"})
//    .then(function (file1Data){
//         console.log("file1Data:", file1Data);
//     })
//     .then(function(){
//         return fs.readFile("file-2.txt", { encoding: "utf-8"})
//     })
//     .then(function (file2Data){
//         console.log("file2Data:", file2Data);
//     })
//     .then(function(){
//         return fs.readFile("file-3.txt", { encoding: "utf-8"})
//     })
//     .then(function (file3Data){
//         console.log("file3Data:", file3Data);
//     })
//     .catch(function (error) {
//             console.error(error);
//         });


        //chain multiple promises


        //same code but with arrow function:

        fs.readFile("file-1.txt", { encoding: "utf-8"})
        .then((file1Data) => console.log("file1Data:", file1Data))
         .then(() => fs.readFile("file-2.txt", { encoding: "utf-8"}))
         .then((file2Data) =>  console.log("file2Data:", file2Data))
         .then(() => fs.readFile("file-3.txt", { encoding: "utf-8"}))
         .then((file3Data) => console.log("file3Data:", file3Data))
         .catch((error) => console.error(error));
