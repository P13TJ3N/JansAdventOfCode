const stack1 = ["H","R","B","D","Z","F","L","S"];
const stack2 = ["T","B","M","Z","R"];
const stack3 = ["Z","L","C","H","N","S"];
const stack4 = ["S","C","F","J"];
const stack5 = ["P","G","H","W","R","Z","B"];
const stack6 = ["V","J","Z","G","D","N","M","T"];
const stack7 = ["G","L","N","W","F","S","P","Q"];
const stack8 = ["M","Z","R"];
const stack9 = ["M","C","L","G","V","R","T"];
const stacks = [stack1, stack2, stack3, stack4, stack5, stack6, stack7, stack8, stack9];

let totalScore = "";

const fs = require("fs");
const readline = require("readline");
const { fileURLToPath } = require("url");

const rd = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  console: false
});

function containterPrinter(stacks) {
  const highestStackHeight = Math.max(...stacks.map(stack => stack.length));

  for (let i = highestStackHeight - 1; i >= 0; i--) {
    let row = "";
    stacks.forEach(stack => {
      if (stack[i]) {
        row += `[${stack[i]}]`;
      } else {
        row += "   ";
      }
    });
    console.log(row);
    if (i === 0) {
      console.log("[1][2][3][4][5][6][7][8][9]");
    }
  }
}

function containerMover(amount, from, to) {
  const toMove = stacks[from]
    .slice(-amount)
    .reverse();
  const newAmount = toMove.length;
  const toStack = stacks[to].concat(toMove);
  stacks[to] = toStack;
  const fromStack = stacks[from].slice(0, stacks[from].length - newAmount);
  stacks[from] = fromStack;
}

rd.on("line", line => {
  containterPrinter(stacks);
  console.log(line);
  const input = line.match(/\b\d+\b/g);
  containerMover(input[0], input[1] - 1, input[2] - 1);
});

rd.on("close", () => {
  containterPrinter(stacks);
  stacks.forEach(stack => {
    if(typeof stack[stack.length-1] == 'undefined'){totalScore = totalScore.concat(" ");}
    else {totalScore = totalScore.concat(stack[stack.length-1]);}
 });
console.log(`the total is ${totalScore}`);
});