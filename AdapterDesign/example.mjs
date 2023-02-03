class LogConsoleAdapter {
    info(message){
        console.info(`[INFO] ${message}`);
    }

    error(message){
        console.error(`[ERROR] ${message}`);
    }
}



//create another adapter
import * as fs from "node:fs";

class LogFileAdapter {
    info(message){
        fs.appendFile("output.log", `[INFO] ${message}\n`, (error) => {
            if(error){
                console.error();
            }
        });
    }

    error(message){
        fs.appendFile("output.log", `[ERROR] ${message}\n`, (error) => {
            if(error){
                console.error();
            }
        });

    }
}




//using this class
// const logger = new LogConsoleAdapter();
const logger = new LogFileAdapter(); //we changed only what adapter we're using

logger.info("This is an important info");

logger.error("Something went wrong!");


//we wrapped the console. methods in the LogConsoleAdapter class
