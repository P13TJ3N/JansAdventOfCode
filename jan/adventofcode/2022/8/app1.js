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

const splitAt = (i, arr) => {
    const clonedArray = [...arr];
    return [clonedArray.splice(0, i), clonedArray];
  };

function treeSpotter(treeMap){
    let row = 0;
    treeMap.forEach(treeLine => {
        for (tree=0;tree < treeLine.length;tree++){
            const [left, right] = splitAt(tree, treeLine)
            right.shift()
            if(treeLine[tree]> Math.max(...left) || treeLine[tree] > Math.max(...right)){scoreMap[row][tree] = 1;};
        };
        row++
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
    scoreMap[0] = Array.from(String(startEndLine), Number) // fill first line
    scoreMap[scoreMap.length-1] = Array.from(String(startEndLine), Number) // fill last line
    treeSpotter(treeMap,scoreMap);//count from top and bottom
    treeCounter(scoreMap);
    scoreMap.forEach(element => {
        console.log(element.toString());
    });
    console.log(`there are ${totalScore} trees visable`);
});