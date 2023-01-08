const someTask = new Promise(function (resolve, reject){
    setTimeout(() => reject(new Error("Something went wrong")), 2000);

});

console.log(someTask);

someTask.then(
    function (value) {
        console.log("value:", value);
        console.log("someTask:", someTask);
    },
    function (reason) {
        console.log("value:", reason);
        console.log("someTask:", someTask);
    },
)
