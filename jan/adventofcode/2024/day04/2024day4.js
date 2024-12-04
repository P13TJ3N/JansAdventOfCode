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
    var lines = inputText.split('\n')
    let lines90 = []
    for (let line = 0; line < lines.length; line++){lines90.push(lines[line].split(''))}
    lines90 = lines90[0].map((val, index) => lines90.map(row => row[index]).reverse().join(""))//yeet 90 degrees
    console.log(lines90);

    //XMASAMX vind maar 1 resultaat met een OR regex :(

    xmasLijst = []
    //opdracht1
    for (let line = 0; line < lines.length; line++){
        const xamsFinder = /XMAS/g //https://regexr.com/
        const samxFinder = /SAMX/g
        let xmatches = lines[line].match(xamsFinder);
        let xmatches90 = lines90[line].match(xamsFinder);
        let smatches = lines[line].match(samxFinder);
        let smatches90 = lines90[line].match(samxFinder);
        if(xmatches){xmasLijst.push(xmatches)};
        if(xmatches90){xmasLijst.push(xmatches90)};
        if(smatches){xmasLijst.push(smatches)};
        if(smatches90){xmasLijst.push(smatches90)};
    };

    console.log(xmasLijst);


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