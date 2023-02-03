// class Counter {

//     constructor(){
//         this.count = 0;
//     }

//     increment(){
//         this.count++;
//     }
// }

// export const counterInstance = new Counter();


//the counter instance could be an obj literal
export const counterInstance = {
    count: 0,
    increment() {
        this.count++;
    }
};
