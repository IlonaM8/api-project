import * as fs from "node:fs/promises";

// async function outputFile(){
//     try{
//         const file1Data = await fs.readFile("file-1.txt", {encoding: "utf-8"});
//         console.log("file1Data:", file1Data);

//         const file2Data = await fs.readFile("file-2.txt", {encoding: "utf-8"});
//         console.log("file2Data:", file2Data);

//         const file3Data = await fs.readFile("file-3.txt", {encoding: "utf-8"});
//         console.log("file3Data:", file3Data);

//     } catch (error){
//         console.log(error)
//     }

// }


// outputFile();


//same code with promise all

// async function outputFilesTogheter(){
//     try{
//         const data = await Promise.all([
//             fs.readFile("file-1.txt", {encoding: "utf-8"}),
//             fs.readFile("file-2.txt", {encoding: "utf-8"}),
//             fs.readFile("file-3.txt", {encoding: "utf-8"})
//         ]);

//         console.log("data:", data);
//     }catch (error){
//         console.error(error);
//     }

// }

// outputFilesTogheter();


//we can use outside the await keyword only in mjs file: TOP LEVEL AWAIT

try{
    const data = await Promise.all([
        fs.readFile("file-1.txt", {encoding: "utf-8"}),
        fs.readFile("file-2.txt", {encoding: "utf-8"}),
        fs.readFile("file-3.txt", {encoding: "utf-8"})
    ]);

    console.log("data:", data);
}catch (error){
    console.error(error);
}
