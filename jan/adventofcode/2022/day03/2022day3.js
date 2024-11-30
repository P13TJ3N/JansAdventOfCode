let resultsList = [];
let resultsList2 = [];
const tekst = "common between all three Elves";
const tekst2 = "What is the sum of the priorities of those item types";

const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
let backpack = [];
let counter = 1;

function calculateResult() {
    var inputElement = document.getElementById("inputTextArea");// haal Input waarden op
    var inputText = inputElement.value;
    processInputText(inputText);// verwerk input waarden
    displayResults();// geef resultaat terug aan webpagina en console.log
}
//functions
function duplicatefinder(line){
    const half = Math.ceil(line.length / 2);
    const firstHalf = line.slice(0, half);
    const secondHalf = line.slice(half);
    const intersection = firstHalf.filter(element => secondHalf.includes(element));
    return intersection;
}
function duplicatefinder2(line1,line2){
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
function arrSum(arr) { 
    return arr.reduce(function(a, b) {
        return a + b;
    }, 0);
}

function processInputText(inputText) {
    var lines = inputText.split('\n')//split

    //opdracht1
    lines.forEach(function(line) {
        let numbers = numerator(line);
        let result = duplicatefinder(numbers);
        resultsList.push(result[0]);
    })
    //opdracht2
    lines.forEach(function(line) {
        let numbers = numerator(line);
        if      (counter === 1) {counter=2; backpack = numbers;}
        else if (counter === 2) {counter=3; backpack = duplicatefinder2(backpack,numbers);}
        else                    {counter=1; let result = duplicatefinder2(backpack,numbers); resultsList2.push(result[0]);};
    })
    //RENDER RESULT
    let kaart = ':D'
    renderKaart(kaart);
}

function displayResults() {
    let resultsListSum = arrSum(resultsList);
    let resultsListSum2 = arrSum(resultsList2);
    console.log(`${tekst} : ${resultsListSum}`);
    console.log(`${tekst2} : ${resultsListSum2}`);
    //stuur info naar HTML document output
    var outputElement = document.getElementById("outputTextArea");
    outputElement.value = `${tekst} : ${resultsListSum} \n${tekst2} : ${resultsListSum2}`;
};

function renderKaart(kaart) {
    //stuur info naar HTML document render
    var outputElement = document.getElementById("renderContainer");
    outputElement.innerHTML = `${kaart}`;
};