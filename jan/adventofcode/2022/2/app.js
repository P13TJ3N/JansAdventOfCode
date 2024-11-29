let totalScoreLes1 = 0;
let totalScoreLes2 = 0;

//import txt file
var fs = require('fs'),readline = require('readline');
var rd = readline.createInterface({input: fs.createReadStream('input.txt'),console: false});


rd.on('line', function(line) {
    let matchScore1 = 0;
    let matchScore2 = 0;
    if      (line === 'A X') {matchScore1 = 4; matchScore2 = 3;}
    else if (line === 'A Y') {matchScore1 = 8; matchScore2 = 4;}
    else if (line === 'A Z') {matchScore1 = 3; matchScore2 = 8;}
    else if (line === 'B X') {matchScore1 = 1; matchScore2 = 1;}
    else if (line === 'B Y') {matchScore1 = 5; matchScore2 = 5;}
    else if (line === 'B Z') {matchScore1 = 9; matchScore2 = 9;}
    else if (line === 'C X') {matchScore1 = 7; matchScore2 = 2;}
    else if (line === 'C Y') {matchScore1 = 2; matchScore2 = 6;}
    else                     {matchScore1 = 6; matchScore2 = 7;}
    totalScoreLes1 += matchScore1;
    totalScoreLes2 += matchScore2;
});

//sum total score
rd.on('close', function() {
    console.log(`the total is ${totalScoreLes1}`);
    console.log(`the total is ${totalScoreLes2}`);
});
