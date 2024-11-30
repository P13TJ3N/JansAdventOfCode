const fs = require("fs");
const readline = require("readline");
const { fileURLToPath } = require("url");

const rd = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  console: false,
});

let currentDir = "";
let dirTree = [];
let dirScores = {};

function updateDirScores(dir, score, parentId, dirScores) { 
  if(dir in dirScores){ // update if exists
      dirScores[dir].score += score
  } else { // create if not
      dirScores[dir] = { score, parentId};
  };
};

rd.on("line", (line) => {
    const source = line.split(" ");
    const padId = dirTree.toString();
    let number = 0 + source[0].match(/\d+/g);
    const parentId = padId.substring(0, padId.lastIndexOf(','))
    if(source[1] === "cd" && source[2] === ".."){
        currentDir = dirTree.pop();
    } else if(source[1] === "cd"){
        currentDir = source[2];
        dirTree.push(source[2]);
    };
    updateDirScores(padId, parseInt(number), parentId, dirScores);
});

rd.on("close", () => {
  const dirSort = Object.keys(dirScores);
  dirSort.sort((a, b) => {return a.split(',').length - b.split(',').length;}).reverse();
  console.log(dirSort);
  dirSort.forEach(dir => {
    const value = dirScores[dir];
    if (value.parentId) {
      dirScores[value.parentId].score += value.score;
    }
  });
  const totalScore = Object.values(dirScores).reduce((accumulator, value) => {
    if (value.score <= 100000) {
      return accumulator + value.score;
    }
    return accumulator;
  }, 0); 
  console.log(`Dir size all dirs smaller than 100000 is ${totalScore}`);
}); //root is 47048086