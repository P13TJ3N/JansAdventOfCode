//TODO: 
//- Dynamically make a list of special characters
//- Dynamically calculate the line size

let resultsList = [];
let resultsList2 = [];
const tekst = "De som van onderdelen is";
const tekst2 = "";

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

function processInputText(inputText) {
    var lines = inputText.split('\n');
    const lineLength = lines[0].length;
    let arrayLength = lines.length;
    let dotLessText = inputText.replace('.','');
    let uniquteChars = dotLessText.replace(/[\n.a-zA-Z0-9]/g,'');
    let specialCharacters = [...new Set(uniquteChars)]
    console.log(`speciale karakters gevonden: ${specialCharacters}`);
    dot = '.';
    let startEndLine = dot.repeat(lineLength)
    lines.unshift(startEndLine);
    lines.push(startEndLine); //voeg nep eerste en laatste lijn toe om onnodige IF statements te voorkomen.
    lineNumber = 0;
    for (let i = 0; i < arrayLength; i++) {
        let engineNumberSet = '';
        let lastLine = i, currentLine = i+1, nextLine = i+2; 
        //pak 3 lijnen tegelijkertijd
        console.log(`====== Lijn ${i} ======`);
        console.log(lines[lastLine]);
        console.log(lines[currentLine]);
        console.log(lines[nextLine]);
        let currentBlock = lines[lastLine]+lines[currentLine]+lines[nextLine];
        let specialCharactersPositions = [];
        console.log(`====== numberCheck ${i} ======`);
        numberCheck = lines[currentLine].replace(/\D/g,'');
        console.log(!(numberCheck == ''));
        if(!(numberCheck == '')&&currentBlock.replace().length>0){//als de regel een getal heeft
            let getallenSets = [];
            let getalSet = '';
            let fistposition = 0;
            let getallenSetsPosities = [];
            for (let i = 0; i < lineLength; i++) { //ga door elk getal heen om de sets eruit te halen
                if(specialCharacters.includes(lines[lastLine][i]) || specialCharacters.includes(lines[currentLine][i]) ||specialCharacters.includes(lines[nextLine][i])){
                    specialCharactersPositions.push(i+1);
                };
                let currentChar = lines[currentLine][i];
                console.log(`checking ${i} of ${lineLength} - ${currentChar}`)
                if (currentChar >= '0' && currentChar <= '9') {// als huidig caracter een getal is
                    getalSet += currentChar;
                    if (fistposition == 0){fistposition = i};//als dit het eerste getal is sla dan de positie op.
                    if(i == lineLength-1){
                        console.log(`QQQFINAL NUMERICAL CHARACTER OF THE LINE`);
                        getallenSets.push(parseInt(getalSet));
                        getalSet = '';
                        getallenSetsPosities[getallenSets.length-1] = [fistposition,i];
                        fistposition = 0;
                    }
                } else if(!(getalSet == '')){ //sluit set af als set bestaat en het huidig karakter geen getal is
                    console.log(`saving set`);
                    getallenSets.push(parseInt(getalSet));
                    getalSet = '';
                    getallenSetsPosities[getallenSets.length-1] = [fistposition,i+1];
                    fistposition = 0;
                };
            };
            
            console.log(`Speciale karakters gevonden op de volgend posities: ${specialCharactersPositions}`)
            if(!(getallenSets.length == 0)){
                console.log(`gevonden sets: ${getallenSets}`);
                for (let i = 0; i < getallenSets.length; i++) {
                    // console.log(getallenSets[i]);
                    // console.log(getallenSetsPosities[i]);
                    specialCharactersPositions.forEach(function(specialCharacterPosition) {
                        if(specialCharacterPosition >= getallenSetsPosities[i][0] && specialCharacterPosition <= getallenSetsPosities[i][1]){
                            resultsList.push(parseInt(getallenSets[i]));
                            console.log(`match gevonden voor: ${getallenSets[i]}`);
                        } else{
                            console.log(`GEEN match gevonden voor: ${getallenSets[i]}, ${specialCharacterPosition} zit niet tussen ${getallenSetsPosities[i][0]} en ${getallenSetsPosities[i][1]} `);
                        };
                    });
                };
            };
        };
      };
};



function displayResults() {
    let resultsListSum = arrSum(resultsList);
    let resultsListSum2 = arrSum(resultsList2);
    console.log(`${tekst} : ${resultsListSum}`);
    // console.log(`De som van de powersets is ${resultsListSum2} \n dit bestaat uit:${resultsList2}`);
    //stuur info naar HTML document output
    var outputElement = document.getElementById("outputText");
    outputElement.textContent = `${tekst} : ${resultsListSum} \n ${tekst2} : ${resultsListSum2}`;
}

//====== Plan van aanpak ========
    //pak 3 lijnen tegelijkertijd
    //kijk in de middelste lijn of er een getal is EN of er een speciaal symbool is.
    //als er getallen zijn, en het zijn er meerderen splijt deze op in sets
    //Splijt alle speciale karakters ook in sets
    //Voor elke set getallen:
        //vind de min en max coordinaten van het set getallen.
        //breid dit uit 
        //Voor elk speciaal karakter:
            //zie of de coordinaten passen in de min-max van, zo ja:
                //markeer set getallen als een Onderdeel
                //Stop de  Loep en ga door naar het volgende set getallen
//==============================