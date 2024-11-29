let treeMap = [];
let scoreMap = [];

const fs = require("fs");
const readline = require("readline");
const { fileURLToPath } = require("url");
const { runInThisContext } = require("vm");

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
            score = scoreMap[row][tree];
            const [left, right] = splitAt(tree, treeLine)
            right.shift()
            left.reverse();
            let rightScore = 0;
            let leftScore = 0;
            for(i = 0; i < right.length; i++){     
                rightScore +=1 
                if(treeLine[tree] <= right[i]){break};
            };
            for(i = 0; i < left.length; i++){
                leftScore +=1 
                if(treeLine[tree] <= left[i]){break};
            };
            score = rightScore * leftScore
            scoreMap[row][tree] = scoreMap[row][tree] * score;
        };
        row++
    });
}

rd.on("line", line => {
    let score = ("1".repeat(line.length)); // fill side lines
    treeMap.push(Array.from(String(line), Number)); 
    scoreMap.push(Array.from(String(score), Number));
});

rd.on("close", () => {
    treeSpotter(treeMap,scoreMap); //count sideways
    treeMap = treeMap[0].map((val, index) => treeMap.map(row => row[index]).reverse())//flip treemap 90 degrees
    scoreMap = scoreMap[0].map((val, index) => scoreMap.map(row => row[index]).reverse())//flip scoremap 90 degres
    treeSpotter(treeMap,scoreMap);//count from top and bottom
    var maxRow = scoreMap.map(function(row){ return Math.max.apply(Math, row); });
    const totalScore = Math.max.apply(null, maxRow);
    console.log(`the highest beauty score is ${totalScore}`);
});