let resultsList = [];
let resultsList2 = [];
const tekst = "assignment pairs does one range fully contain the other";
const tekst2 = "assignment pairs do the ranges overlap";

let stack1 = ["H","R","B","D","Z","F","L","S"]
let stack2 = ["T","B","M","Z","R"]
let stack3 = ["Z","L","C","H","N","S"]
let stack4 = ["S","C","F","J"]
let stack5 = ["P","G","H","W","R","Z","B"]
let stack6 = ["V","J","Z","G","D","N","M","T"]
let stack7 = ["G","L","N","W","F","S","P","Q"]
let stack8 = ["M","Z","R"]
let stack9 = ["M","C","L","G","V","R","T"]
let stacks = [stack1, stack2, stack3, stack4, stack5, stack6, stack7, stack8, stack9];

let totalScore = "";

function calculateResult() {
    var inputElement = document.getElementById("inputTextArea");// haal Input waarden op
    var inputText = inputElement.value;
    processInputText(inputText);// verwerk input waarden
    displayResults();// geef resultaat terug aan webpagina en console.log
}
//functions
function arrSum(arr) { 
    return arr.reduce(function(a, b) {
        return a + b;
    }, 0);
}
function containterPrinter(stacks){
    //find longest stack
    let heighestStackHeight = 0;
    for (let i = 0; i < stacks.length; i++) {heighestStackHeight = Math.max(heighestStackHeight, stacks[i].length);};

    //print from top to bottom
    for (var i = heighestStackHeight; i >= 0; i--) {
        let row ="";
        stacks.forEach(stack => {
            if(typeof stack[i] == 'undefined'){row = row.concat("   ");
            } else if(stack.length >= i){row = row.concat("[").concat(stack[i]).concat("]");
            } else {row = row.concat("   ")};
         });
         console.log(row);
         if(i === 0){console.log("[1][2][3][4][5][6][7][8][9]");}
    };
}

function containerMover(amount,from,to){
    //get from list and get amount from the end
    let toMove = stacks[from].slice((amount*-1)).reverse();
    let newAmount = toMove.length;

    //overwrite to list with append to end 
    let toStack = stacks[to].concat(toMove);
    stacks[to] = toStack;

    //remove amount from from list and save to array
    let fromStack = stacks[from].slice(0, (stacks[from].length - newAmount));
    stacks[from] = fromStack;

}

function processInputText(inputText) {
    var lines = inputText.split('\n')//split

    //opdracht1
    lines.forEach(function(line) {
        containterPrinter(stacks);
        console.log(line);
        const input = line.match(/\b\d+\b/g);
        containerMover(input[0],input[1]-1,input[2]-1); 
    })
    containterPrinter(stacks);
    stacks.forEach(stack => {
        if(typeof stack[stack.length-1] == 'undefined'){totalScore = totalScore.concat(" ");}
        else {totalScore = totalScore.concat(stack[stack.length-1]);}
     });
    console.log(`the total is ${totalScore}`);

    //RENDER RESULT
}

function displayResults() {
    let resultsListSum = arrSum(resultsList);
    let resultsListSum2 = arrSum(resultsList2);
    console.log(`${tekst} : ${resultsListSum}`);
    console.log(`${tekst2} : ${resultsListSum2}`);
    //stuur info naar HTML document output
    var outputElement = document.getElementById("outputTextArea");
    outputElement.value = `${tekst} : ${resultsListSum} \n${tekst2} : ${resultsListSum2}`;
};

function renderKaart(kaart) {
    //stuur info naar HTML document render
    var outputElement = document.getElementById("renderContainer");
    outputElement.innerHTML = `${kaart}`;
};