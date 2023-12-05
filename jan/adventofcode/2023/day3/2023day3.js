let resultsList = [];
let resultsList2 = [];
const tekst = "De som van onderdelen is";
const tekst2 = "De som van alle tandwielen is";

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

function Empty2DArray(rows, cols) { 
    return Array.from({ length: rows }, 
        () => Array(cols).fill(null)); 
}

function processInputText(inputText) {
    var lines = inputText.split('\n');
    const lineLength = lines[0].length;
    let arrayLength = lines.length;
    let dotLessText = inputText.replace('.','');
    let uniquteChars = dotLessText.replace(/[\n.a-zA-Z0-9]/g,'');
    let specialCharacters = [...new Set(uniquteChars)]

    let tandwielen = Empty2DArray(arrayLength,lineLength);

    console.log(`speciale karakters gevonden: ${specialCharacters}`);
    dot = '.';
    let startEndLine = dot.repeat(lineLength)
    lines.unshift(startEndLine);
    lines.push(startEndLine); //voeg nep eerste en laatste lijn toe om onnodige IF statements te voorkomen.
    lineNumber = 0;
    
    for (let i = 0; i < arrayLength; i++) {
        let lastLine = i, currentLine = i+1, nextLine = i+2; 
        //pak 3 lijnen tegelijkertijd
        console.log(`====== Lijn ${i} ======`);
        console.log(lines[lastLine]);
        console.log(lines[currentLine]);
        console.log(lines[nextLine]);
        let currentBlock = lines[lastLine]+lines[currentLine]+lines[nextLine];
        console.log(`====== numberCheck ${i} ======`);
        numberCheck = lines[currentLine].replace(/\D/g,'');
        console.log(!(numberCheck == ''));
        // if(!(numberCheck == '')&&currentBlock.replace().length>0){//als de regel een getal heeft
        if(currentBlock.replace().length>0){//als de regel een getal heeft
            let getallenSets = [];
            let getalSet = '';
            let fistposition = null;
            let getallenSetsPosities = [];
            for (let i = 0; i < lineLength; i++) { //ga door elk getal heen om de sets eruit te halen
                let currentChar = lines[currentLine][i];
                if (currentChar >= '0' && currentChar <= '9') {// als huidig caracter een getal is
                    getalSet += currentChar;
                    if (fistposition == null){fistposition = i};//als dit het eerste getal is sla dan de positie op.
                    if(i == lineLength-1){//sluit getalset af als dit getal het laatste getal in de lijn is
                        getallenSets.push(parseInt(getalSet));
                        getalSet = '';
                        getallenSetsPosities[getallenSets.length-1] = [fistposition,i];
                        fistposition = null;
                    }
                } else if(!(getalSet == '')){ //sluit set af als set bestaat en het huidig karakter geen getal is
                    console.log(`saving set`);
                    getallenSets.push(parseInt(getalSet));
                    getalSet = '';
                    getallenSetsPosities[getallenSets.length-1] = [fistposition,i-1];
                    fistposition = null;
                };
            };
            if(!(getallenSets.length == 0)){
                console.log(`gevonden sets: ${getallenSets}`);
                for (let i = 0; i < getallenSets.length; i++) {
                    console.log(`${getallenSets[i]} - ${getallenSetsPosities[i]} `);
                    let addSet = false;

                    for (let b = (getallenSetsPosities[i][0]-1); b < (getallenSetsPosities[i][1]+2); b++){
                        console.log(`Positie: ${lastLine},${b} Karakter: ${lines[lastLine][b]} - ${specialCharacters.includes(lines[lastLine][b])}`);
                        if(specialCharacters.includes(lines[lastLine][b])){addSet = true};
                        if(lines[lastLine][b] == '*'){
                            console.log(`tandwield gevonden op positie: ${lastLine},${b}`);
                            if(tandwielen[lastLine][b] === null){tandwielen[lastLine][b] = getallenSets[i]; console.log('eerste toevoeging aan positie')}
                            else{tandwielen[lastLine][b] += ("," + getallenSets[i]);}
                            console.log(JSON.stringify(tandwielen));
                        };

                        console.log(`Positie: ${currentLine},${b} Karakter: ${lines[currentLine][b]} - ${specialCharacters.includes(lines[currentLine][b])}`);
                        if(specialCharacters.includes(lines[currentLine][b])){addSet = true};
                        if(lines[currentLine][b] == '*'){
                            console.log(`tandwield gevonden op positie: ${currentLine},${b}`);
                            if(tandwielen[currentLine][b] === null){tandwielen[currentLine][b] = getallenSets[i]; console.log('eerste toevoeging aan positie')}
                            else{tandwielen[currentLine][b] += ("," + getallenSets[i]);}
                            console.log(JSON.stringify(tandwielen));
                        };

                        console.log(`Positie: ${nextLine},${b} Karakter: ${lines[nextLine][b]} - ${specialCharacters.includes(lines[nextLine][b])}`);
                        if(specialCharacters.includes(lines[nextLine][b])){addSet = true};
                        if(lines[nextLine][b] == '*'){
                            console.log(`tandwield gevonden op positie: ${nextLine},${b}`);
                            if(tandwielen[nextLine][b] === null){tandwielen[nextLine][b] = getallenSets[i]; console.log('eerste toevoeging aan positie')}
                            else{tandwielen[nextLine][b] += ("," + getallenSets[i]);}
                            console.log(JSON.stringify(tandwielen));
                        };
                };
                    if(addSet){resultsList.push(parseInt(getallenSets[i]));};
                };
            };
        };
        
      };
      tandwielen = tandwielen.flat().filter(elements => {
        return (elements != null && elements !== undefined && elements !== "");
       });
       console.log(tandwielen);
       tandwielen.forEach(wiel => {
        console.log(wiel);
        if(typeof wiel === 'string'){
            let onderdelen = wiel.split(',');
            if(onderdelen.length === 2){
                let somVanOnderdelen = parseInt(onderdelen[0])*parseInt(onderdelen[1]);
                resultsList2.push(parseInt(somVanOnderdelen));
            };
        };
       });
};


function displayResults() {
    let resultsListSum = arrSum(resultsList);
    let resultsListSum2 = arrSum(resultsList2);
    console.log(`${tekst} : ${resultsListSum}`);
    console.log(`${tekst2} : ${resultsListSum2}`);
    //stuur info naar HTML document output
    var outputElement = document.getElementById("outputText");
    outputElement.textContent = `${tekst} : ${resultsListSum} \n ${tekst2} : ${resultsListSum2}`;
};