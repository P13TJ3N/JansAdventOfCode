
let resultsList = []; //vind de verste locatie die het diertje kan lopen in de loep van de start.
let resultsList2 = [];
const tekst = "som van korste afstanden tussen planeten is";
const tekst2 = "de som van de kortste mega afstanden is";

function calculateResult() {
    // haal Input waarden op
    var inputElement = document.getElementById("inputTextArea");
    var inputText = inputElement.value;
    // verwerk input waarden
    processInputText(inputText);
    // geef resultaat terug aan webpagina en console.log
    displayResults();
}

function arrSum(arr) { 
    return arr.reduce(function(a, b) {
        return a + b;
    }, 0);
}

function expandSpace(lines,grootte){
    let expandedLines = lines;
    for (let index = 0; index < expandedLines.length; index++) {
        const line = expandedLines[index];
        if(!(line.includes("#"))){ //voeg nieuwe lijn toe als er geen planeten zij
            for (let ruimte = 0; ruimte < grootte; ruimte++) {
                expandedLines.splice(index,0,expandedLines[index]); 
            };
            index+=grootte;// sla lijnen over
        };
    }
    return expandedLines;
}

function processInputText(inputText) {
    var lines = inputText.split('\n');

    for (let index = 0; index < lines.length; index++) {
        lines[index] = lines[index].split("");
    };
    let lines2 = lines;

    //============================11.1====================
    //GROEI DE RUIMTE
    lines = lines[0].map((val, index) => lines.map(row => row[index]).reverse())//kantel 90 graden -    //https://stackoverflow.com/questions/15170942/how-to-rotate-a-matrix-in-an-array-in-javascript
    lines = expandSpace(lines,1);
    lines = lines[0].map((val, index) => lines.map(row => row[row.length-1-index]))//kantel terug
    lines = expandSpace(lines,1);
    
    //tel planeten
    let planeten = [];    
    for (let row = 0; row < lines.length; row++) {
        if(lines[row].includes("#")){
            for (let col = 0; col < lines[0].length; col++) {
                const ruimte = lines[row][col];
                if(ruimte === "#"){planeten.push([row,col]);
    };};};};

    // zie welke unieke combinaties van planeten er zijn
    let planeetParen = []
    for (let planeet = 0; planeet < planeten.length; planeet++) {
        for (let planeet2 = 0; planeet2 < planeten.length; planeet2++) {
            if(planeet < planeet2){planeetParen.push([planeet,planeet2])}
        };};

    // meet afstand
    for (let paarNr = 0; paarNr < planeetParen.length; paarNr++) {
        let afstand = 0;
        const startRij = planeten[planeetParen[paarNr][0]][0];
        const startCol = planeten[planeetParen[paarNr][0]][1];
        const doelRij = planeten[planeetParen[paarNr][1]][0];
        const doelCol = planeten[planeetParen[paarNr][1]][1];
        afstand = Math.abs(startCol - doelCol) +  Math.abs(startRij - doelRij);
        resultsList.push(afstand);
    }

    //============================11.2====================
    const groeiFactor = 1000000;

    //GROEI DE RUIMTE
    console.log("start kantelen");
    lines2 = lines2[0].map((val, index) => lines2.map(row => row[index]).reverse())//kantel 90 graden -    //https://stackoverflow.com/questions/15170942/how-to-rotate-a-matrix-in-an-array-in-javascript
    console.log("klaar met kantelen, we voegen nu tering veel ruimte toe");
    lines2 = expandSpace(lines2,groeiFactor);
    console.log("start terug kantelen");
    lines2 = lines2[0].map((val, index) => lines2.map(row => row[row.length-1-index]))//kantel terug
    console.log("klaar met terug kantelen, we voegen nu tering veel ruimte toe");
    lines2 = expandSpace(lines2,groeiFactor);
    
    console.log(`we gaan nu de planeten tellen`);
    //tel planeten
    let planeten2 = [];    
    for (let row = 0; row < lines2.length; row++) {
        if(lines2[row].includes("#")){
            for (let col = 0; col < lines2[0].length; col++) {
                const ruimte = lines2[row][col];
                if(ruimte === "#"){planeten2.push([row,col]);
    };};};};

    console.log(`we gtellen nu de unieke planeet combinaties`);
    // zie welke unieke combinaties van planeten er zijn
    let planeetParen2 = []
    for (let planeet = 0; planeet < planeten2.length; planeet++) {
        for (let planeet2 = 0; planeet2 < planeten2.length; planeet2++) {
            if(planeet < planeet2){planeetParen2.push([planeet,planeet2])}
        };};

    console.log(`we meten nu de afstanden tussen de planeten`);
    // meet afstand
    for (let paarNr = 0; paarNr < planeetParen2.length; paarNr++) {
        let afstand = 0;
        const startRij = planeten2[planeetParen2[paarNr][0]][0];
        const startCol = planeten2[planeetParen2[paarNr][0]][1];
        const doelRij = planeten2[planeetParen2[paarNr][1]][0];
        const doelCol = planeten2[planeetParen2[paarNr][1]][1];
        afstand = Math.abs(startCol - doelCol) +  Math.abs(startRij - doelRij);
        resultsList2.push(afstand);
    }

    //RENDER RESULT
    let renderMap = lines;
    for (let index = 0; index < lines.length; index++) {
        renderMap[index] = renderMap[index].join("");
        }
        renderMap = renderMap.join("<br>");
    renderKaart(renderMap);
};

function displayResults() {
    let resultsListSum = arrSum(resultsList);
    let resultsListSum2 = arrSum(resultsList2);
    console.log(`${tekst} : ${resultsListSum}`);
    console.log(`${tekst2} : ${resultsListSum2}`);
    //stuur info naar HTML document output
    var outputElement = document.getElementById("outputText");
    outputElement.innerHTML = `${tekst} : ${resultsListSum} <br> ${tekst2} : ${resultsListSum2}`;
};

function renderKaart(kaart) {
    //stuur info naar HTML document output
    var outputElement = document.getElementById("renderContainer");
    outputElement.innerHTML = `${kaart}`;
};