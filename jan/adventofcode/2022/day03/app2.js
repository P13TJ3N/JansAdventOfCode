const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
let totalScore = 0;
let backpack = [];
let counter = 1;

//import txt file
var fs = require('fs'),readline = require('readline');
var rd = readline.createInterface({input: fs.createReadStream('input.txt'),console: false});

//functions
function duplicatefinder(line1,line2){
    const intersection = line1.filter(element => line2.includes(element));
    return intersection;
}

function numerator(line){
    let text = Array.from(line);
    let convertedText = [];
    text.forEach(letter => {
        index = alphabet.indexOf(letter)+1;
        convertedText.push(index);
        });
    return convertedText;
}

//do something line by line of the imported file
rd.on('line', function(line) {
    let numbers = numerator(line);
    if      (counter === 1) {counter=2; backpack = numbers;}
    else if (counter === 2) {counter=3; backpack = duplicatefinder(backpack,numbers);}
    else                    {counter=1; let result = duplicatefinder(backpack,numbers); totalScore += result[0];};
});

//do something after final line
rd.on('close', function() {
    console.log(`the total is ${totalScore}`);
});

