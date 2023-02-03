


class Counter {
    constructor(logger){
        this.count = 0;
        this.logger = logger;
    }

    setLogger(logger){
        this.logger = logger;

    }

    increment(){
        this.count++;
    }

    logValue(){
        if(!this.logger){
            throw new Error('No logger instance set');
        }
        this.logger.output(this.count);
    }
}

class Logger {
    output(message){
        console.log(message);
    }

}

const counter = new Counter(new Logger());
counter.setLogger(new Logger());

counter.increment();
counter.increment();
counter.increment();
counter.increment();



