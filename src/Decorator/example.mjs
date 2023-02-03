class Text {
    constructor(text){
        this.string = text;
    }
    toString() {
        return this.string;
    }
}

console.log(new Text("This is some text").toString());


//decorate teh text with another class
import clc from "cli-color";

class BlueText {
    constructor(text) {
        this.text = text;
    }

    toString(){
        return clc.cyan(this.text.toString());
    }
}

console.log(new Text("This is another text").toString());
console.log(new BlueText(new Text("This text is cyan")).toString());
console.log(new Text("This is another text").toString());
