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
const spaceNeeded = 30000000;

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
  dirSort.forEach(dir => {
    const value = dirScores[dir];
    if (value.parentId) {
      dirScores[value.parentId].score += value.score;
    }
  });
  const diskspace = 70000000 - dirScores['/'].score; 
  const target = spaceNeeded- diskspace;
  console.log(target);
  for(const dir in dirScores) {
    if (dirScores[dir].score < target) {
      delete dirScores[dir];
    } 
  }
  let totalScore = dirScores['/'].score;
  for(const dir in dirScores) {
    if (dirScores[dir].score < totalScore) {
      totalScore = dirScores[dir].score;
    };
  }
  console.log(`the awnser is ${totalScore}`);
});