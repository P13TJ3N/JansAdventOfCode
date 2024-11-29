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

//import txt file
var fs = require('fs'),readline = require('readline');
const { fileURLToPath } = require('url')
var rd = readline.createInterface({input: fs.createReadStream('input.txt'),console: false});

//functions
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
    let toMove = stacks[from].slice((amount*-1));
    let newAmount = toMove.length;

    //overwrite to list with append to end 
    let toStack = stacks[to].concat(toMove);
    stacks[to] = toStack;

    //remove amount from from list and save to array
    let fromStack = stacks[from].slice(0, (stacks[from].length - newAmount));
    stacks[from] = fromStack;

}

//do something line by line of the imported file
rd.on('line', function(line) {
    containterPrinter(stacks);
    console.log(line);
    const input = line.match(/\b\d+\b/g);
    containerMover(input[0],input[1]-1,input[2]-1);
});

//do something after final line
rd.on('close', function() {
    containterPrinter(stacks);
    stacks.forEach(stack => {
        if(typeof stack[stack.length-1] == 'undefined'){totalScore = totalScore.concat(" ");}
        else {totalScore = totalScore.concat(stack[stack.length-1]);}
     });
    console.log(`the total is ${totalScore}`);
});