let totalScore = 0;
const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

//import txt file
var fs = require('fs'),readline = require('readline');
var rd = readline.createInterface({input: fs.createReadStream('input.txt'),console: false});

//functions
function duplicatefinder(line){
    const half = Math.ceil(line.length / 2);
    const firstHalf = line.slice(0, half);
    const secondHalf = line.slice(half);
    const intersection = firstHalf.filter(element => secondHalf.includes(element));
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
    let result = duplicatefinder(numbers);
    totalScore += result[0];
});

//do something after final line
rd.on('close', function() {
    console.log(`the total is ${totalScore}`);
});