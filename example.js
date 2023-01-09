

// const value = {
//     name: "Mercury",
//     diameter: 1234,
//     stats: {
//         stats1: 2222,
//         stats2: "another star",
//         stat3: {
//             speed: { unit: "mph"}
//         }
//     },
// }

//label and value
// console.log("Value:", value);


// short obj sintax: the name value will be used as a name of the property and as the value itself
// console.log({value});


//format specifier with %s
//  console.log("diameter = %s", value.diameter);

//  console.log("diameter = %s and stat2 = %s", value.diameter, value.stats.stats2);


//console.error:

// const value1 = "Hello there (stdout)"
// const value2 = "Hello htere (stderr)"

// console.error(value1);
// console.log(value2);

//we need redirect: node example.js > output.txt
// to redirect err: node example.js 2> output.txt


//console.assert:  assert a particular value - it will output a message if the condition is false.

// console.assert(value.name === "Mars", "The planet is not Mars");
//only login something id things are as we not expect it.

//JSON.stringify - we get a formated obj
// console.log(JSON.stringify(value, null, 2));

//console.dir
// console.dir(value, {depth: 0}); //will show the top level properties.

// console.dir(value, {depth: null}); // infinite


//----------------------------------------------------------------------------

// const value = [
//     { name: "Mercury", diameter: 123 },
//     { name: "Venus", diameter: 1553 },
//     { name: "Jupiter", diameter: 18823 },
//     { name: "Moon", diameter: 12343 },
//     { name: "Sun", diameter: 12385},
// ]

// console.table(value) //formated in a table


//---------------------------------------------------------

// function doSomething(){
//     doSomethingElse();
// }

// function doSomethingElse(){
//     console.trace("helpful msg"); //shows what functions had been run.
// }

// doSomething();


//----------------------------------------------

// function doSomething(){
// console.count("I'm called");
// }


// doSomething();
// doSomething();

// console.countReset("I'm called")
// doSomething();



//---------------------------------------

// console.time("it's a loop");

// for (let i = 0; i < 10_000; i++){
//     console.log(i);
// }

// console.timeEnd("it's a loop");
