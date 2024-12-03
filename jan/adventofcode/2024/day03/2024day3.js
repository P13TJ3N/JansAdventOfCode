let resultsList = [];
let resultsList2 = [];
const tekst = "";
const tekst2 = "";

function calculateResult() {
    var inputElement = document.getElementById("inputTextArea");// haal Input waarden op
    var inputText = inputElement.value;
    processInputText(inputText);// verwerk input waarden
    displayResults();// geef resultaat terug aan webpagina en console.log
}
//functions
function arrSum(arr) { 
    return arr.reduce(function(a, b) {
        return a + b;
    }, 0);
}
function validDigits(n){ //https://stackoverflow.com/questions/7148513/javascript-regular-expression-allow-only-numbers-and-commas
    return n.replace(/[^\d,]+/g, '');
 }

//main loop
function processInputText(inputText) {
    const vindInstructies = /don't\(\)|do\(\)|mul\([0-9]+,[0-9]+\)/g //https://regexr.com/
    const instructies = inputText.match(vindInstructies);
    let operatie = true
    for (let instructie = 0; instructie < instructies.length; instructie++){//we gaan er vanuit dat elke som uniek is (getest, dit is zo)
        if(instructies[instructie] === "do()"){operatie = true;}
        else if (instructies[instructie] === "don't()"){operatie = false}
        else {
            let getallen = instructies[instructie].split(',');
            let eersteGetal = validDigits(getallen[0]);
            let tweedeGetal = validDigits(getallen[1]);
            resultsList.push(eersteGetal*tweedeGetal);
            if(operatie){resultsList2.push(eersteGetal*tweedeGetal);}
        }
    };
    let kaart = ':D'
    renderKaart(kaart);
}

function displayResults() {
    let resultsListSum = arrSum(resultsList);console.log(`${tekst} : ${resultsListSum}`);
    let resultsListSum2 = arrSum(resultsList2);console.log(`${tekst2} : ${resultsListSum2}`);
    
    //stuur info naar HTML document output
    var outputElement = document.getElementById("outputTextArea");
    outputElement.value = `${tekst} : ${resultsListSum} \n${tekst2}: ${resultsListSum2}`;
};

function renderKaart(kaart) {
    //stuur info naar HTML document render
    var outputElement = document.getElementById("renderContainer");
    outputElement.innerHTML = `${kaart}`;
};