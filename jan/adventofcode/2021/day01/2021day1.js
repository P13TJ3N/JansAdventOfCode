let resultsList = [];
let resultsList2 = [];
const tekst = "Aantal keer gezakt";
const tekst2 = "Aantal keer diep gezakt";

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
    resultsList = 0;
    resultsList2 = 0;
    var lines = inputText.split('\n').map(function(item) {return parseInt(item, 10);})//split en verander in getallen

    //opdracht1
    for (let line = 1; line < lines.length; line++){
        if (lines[line] > lines[line-1]){
            resultsList++,
            console.log(`${lines[line]} is groter dan ${lines[line-1]}, we zakken`)
        }
    }
    //opdracht2
    for (let line = 1; line+2 < lines.length; line++){
        if ((lines[line]+lines[line+1]+lines[line+2]) > (lines[line-1]+lines[line]+lines[line+1])){
            resultsList2++,
            console.log(`${lines[line]+lines[line+1]+lines[line+2]} is groter dan ${lines[line-1]+lines[line]+lines[line+1]}, we zakken Diep`)
        }
    }
    //RENDER RESULT
    let kaart = ':D hello world!'
    renderKaart(kaart);
}

function displayResults() {
    let resultsListSum = resultsList//arrSum(resultsList);
    let resultsListSum2 = resultsList2//arrSum(resultsList2);
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