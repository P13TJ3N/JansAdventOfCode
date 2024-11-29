let totalScore = 0;
let treeMap = [];
let scoreMap = [];

const fs = require("fs");
const readline = require("readline");
const { fileURLToPath } = require("url");

const rd = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  console: false
})

//find the max height tree in every row, if multiple trees are that height, find the tree that is the closest.
//Then mark that tree as visable.
function treeSpotter(treeMap,scoreMap){ //ToDo -- adjust to count trees from left or right that are before the highest tree
    let i=0
    treeMap.forEach(treeLine => {
        score = scoreMap[i]
        const max = Math.max(...treeLine);
        const indexes = [];
        for (let index = 0; index < (treeLine.length-1); index++) {
          if (treeLine[index] === max) {
            indexes.push(index);
          }
        }
        for (tree = 0; tree < indexes[0]; tree++){
          score[tree] = 1;
        }
        score.reverse()
        rightIndex = treeLine.length - indexes[indexes.length - 1] -1
        console.log(rightIndex)
        for (tree = 0; tree < rightIndex; tree++){
          score[tree] = 1;
        }
        score.reverse()
        scoreMap[i] = score;
        i++
    });
}

function treeCounter(scoreMap){
    scoreMap.forEach(treeLine => {
        totalScore += treeLine.reduce((a, b) => {return a + b;});
    });
}

rd.on("line", line => {
    let score = ("1"+"0".repeat(line.length-2)+"1"); // fill side lines
    treeMap.push(Array.from(String(line), Number)); 
    scoreMap.push(Array.from(String(score), Number));
});

rd.on("close", () => {
    startEndLine = "1".repeat(scoreMap.length)
    scoreMap[0] = Array.from(String(startEndLine), Number) // fill first line
    scoreMap[scoreMap.length-1] = Array.from(String(startEndLine), Number) // fill last line

    treeSpotter(treeMap,scoreMap); //count sideways
    treeMap = treeMap[0].map((val, index) => treeMap.map(row => row[index]).reverse())//flip treemap 90 degrees
    scoreMap = scoreMap[0].map((val, index) => scoreMap.map(row => row[index]).reverse())//flip scoremap 90 degres
    treeSpotter(treeMap,scoreMap);//count from top and bottom
    treeCounter(scoreMap);
    console.log(`there are ${totalScore} trees visable`);

});

//5962 is too high