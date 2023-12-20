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

function vindLegeRijen(lines){
    let legeRijen = [];
    for (let index = 0; index < lines.length; index++) {
        const line = lines[index];
        if(!(line.includes("#"))){ //registreer de lege lijn
            legeRijen.push(index);
        };
    }
    return legeRijen;
}

function processInputText(inputText) {
    var lines = inputText.split('\n');

    for (let index = 0; index < lines.length; index++) {
        lines[index] = lines[index].split("");
    };

    const groeiFactor = 1000000;

    //GROEI DE RUIMTE
    lines = lines[0].map((val, index) => lines.map(row => row[index]).reverse())//kantel 90 graden -    //https://stackoverflow.com/questions/15170942/how-to-rotate-a-matrix-in-an-array-in-javascript
    ruimteColomen = vindLegeRijen(lines);
    lines = lines[0].map((val, index) => lines.map(row => row[row.length-1-index]))//kantel terug
    ruimteRijen = vindLegeRijen(lines);
    
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
        let afstand2 = 0;

        let ruimteRijMatches = [];
        let ruimteColomMatches = [];
        const startRij = planeten[planeetParen[paarNr][0]][0];
        const doelRij = planeten[planeetParen[paarNr][1]][0];
        const startCol = planeten[planeetParen[paarNr][0]][1];
        const doelCol = planeten[planeetParen[paarNr][1]][1];

        if(startRij < doelRij){ruimteRijMatches = ruimteRijen.filter(function(item) {return (item > startRij && item < doelRij);});}
        else{ruimteRijMatches = ruimteRijen.filter(function(item) {return (item > doelRij && item < startRij);});}
        if(startCol < doelCol){ruimteColomMatches = ruimteColomen.filter(function(item){return (item > startCol && item < doelCol);});}
        else{ruimteColomMatches = ruimteColomen.filter(function(item){return (item > doelCol && item < startCol);});}

        afstand =  Math.abs(startCol - doelCol) +  Math.abs(startRij - doelRij) + ruimteRijMatches.length*1 + ruimteColomMatches.length*1;
        afstand2 =  Math.abs(startCol - doelCol) +  Math.abs(startRij - doelRij) + (ruimteRijMatches.length*(groeiFactor-1)) + (ruimteColomMatches.length*(groeiFactor-1));
        resultsList.push(afstand);
        resultsList2.push(afstand2);
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