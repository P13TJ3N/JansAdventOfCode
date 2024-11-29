let aantalDieptepunten = 0;
let aantalGesommeerdeDieptepunten = 0;

function calculateResult() {
    var inputElement = document.getElementById("inputTextArea");
    var inputText = inputElement.value;
    processInputText(inputText);
    displayResults();
}

function arrSum(arr) { //function to sum an array
    return arr.reduce(function(a, b) {
        return a + b;
    }, 0);
}

function processInputText(inputText) {
    var lines = inputText.split('\n').map(function(item) {return parseInt(item, 10);})//split en verander in getallen

    //opdracht1
    for (let line = 1; line < lines.length; line++){
        if (lines[line] > lines[line-1]){
            aantalDieptepunten++,
            console.log(`${lines[line]} is groter dan ${lines[line-1]}, we zakken`)
        }
    }
    //opdracht2
    for (let line = 1; line+2 < lines.length; line++){
        if ((lines[line]+lines[line+1]+lines[line+2]) > (lines[line-1]+lines[line]+lines[line+1])){
            aantalGesommeerdeDieptepunten++,
            console.log(`${lines[line]+lines[line+1]+lines[line+2]} is groter dan ${lines[line-1]+lines[line]+lines[line+1]}, we zakken Diep`)
        }
    }
}

function displayResults() {
    console.log(`we zijn ${aantalDieptepunten} keer gezakt en ${aantalGesommeerdeDieptepunten} keer diep gezakt`);
    // Display results in the output field
    var outputElement = document.getElementById("outputText");
    outputElement.textContent = `we zijn ${aantalDieptepunten} keer gezakt en ${aantalGesommeerdeDieptepunten} keer diep gezakt`;
}