let resultsList = [];
let resultsList2 = [];
const tekst = "total score be if everything goes exactly according to your strategy guide";
const tekst2 = "New strategy score";

function calculateResult() {
    var inputElement = document.getElementById("inputTextArea");// haal Input waarden op
    var inputText = inputElement.value;
    processInputText(inputText);// verwerk input waarden
    displayResults();// geef resultaat terug aan webpagina en console.log
}

function arrSum(arr) { 
    return arr.reduce(function(a, b) {
        return a + b;
    }, 0);
}

function processInputText(inputText) {
    var lines = inputText.split('\n')//split

    //opdracht1 + 2
    lines.forEach(function(line) {
            if      (line === 'A X') {matchScore1 = 4; matchScore2 = 3;}
            else if (line === 'A Y') {matchScore1 = 8; matchScore2 = 4;}
            else if (line === 'A Z') {matchScore1 = 3; matchScore2 = 8;}
            else if (line === 'B X') {matchScore1 = 1; matchScore2 = 1;}
            else if (line === 'B Y') {matchScore1 = 5; matchScore2 = 5;}
            else if (line === 'B Z') {matchScore1 = 9; matchScore2 = 9;}
            else if (line === 'C X') {matchScore1 = 7; matchScore2 = 2;}
            else if (line === 'C Y') {matchScore1 = 2; matchScore2 = 6;}
            else                     {matchScore1 = 6; matchScore2 = 7;}
            resultsList.push(matchScore1)
            resultsList2.push(matchScore2)

    }
    //RENDER RESULT
    //let kaart = ':D'
    //renderKaart(kaart);
)}

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