let totalScore =0;


//import txt file
var fs = require('fs'),readline = require('readline');
var rd = readline.createInterface({input: fs.createReadStream('input.txt'),console: false});

function comapritor(line1,line2){
    let line1split = line1.split("-").map(Number);
    let line2Split = line2.split("-").map(Number);
    if(line1split[0] >= line2Split[0] && line1split[1] <= line2Split[1]){
        console.log(`${line1} past in ${line2}`);
        console.log(`${line1split[0]} is equal or greater than ${line2Split[0]}`);
        console.log(`${line1split[1]} is equal or smaller than ${line2Split[1]}`); 
        return 1;
    }else if(line1split[1] >= line2Split[1] && line1split[0] <= line2Split[0]){
        console.log(`${line2} past in ${line1}`);
        console.log(`${line1split[1]} is equal or greater than ${line2Split[1]}`);
        console.log(`${line1split[0]} is equal or smaller than ${line2Split[0]}`); 
        return 1;
    }else {console.log(`no match found comparing ${line1} and ${line2}`); return 0;};
}

//do something line by line of the imported file
rd.on('line', function(line) {
    let lines = line.split(",");
    let line1 = lines[0];
    let line2 = lines[1];
    totalScore += comapritor(line1, line2); 
    console.log(totalScore);
});

//do something after final line
rd.on('close', function() {
    console.log(`the total is ${totalScore}`);
});

