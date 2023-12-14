let resultsList = [];
let resultsList2 = [];
const tekst = "Stappen tot het einde";
const tekst2 = "Spookstappen tot het einde";

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

function getOccurrence(array, value) { //https://stackoverflow.com/questions/37365512/count-the-number-of-times-a-same-value-appears-in-a-javascript-array
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}

function primeFactors(n) { //https://stackoverflow.com/questions/39899072/how-can-i-find-the-prime-factors-of-an-integer-in-javascript
    const factors = [];
    let divisor = 2;
  
    while (n >= 2) {
      if (n % divisor == 0) {
        factors.push(divisor);
        n = n / divisor;
      } else {
        divisor++;
      }
    }
    return factors;
  }
  

function getSteps(locatieNaam, instructies, locaties){
    let locatie = locaties.get(locatieNaam);
    let steps = 0;
    let aantalEindesGevonden = [];
    while (aantalEindesGevonden.length < 1)  {
        for (let index = 0; index < instructies.length; index++) {
            const instructie = instructies[index];
            steps++;
            if(instructie === `L`){
                locatieNaam = locatie[0];
                locatie = locaties.get(locatieNaam);
            }else{
                locatieNaam = locatie[1];
                locatie = locaties.get(locatieNaam);
            };
            if(locatieNaam.charAt(2) === 'Z'){console.log(locatieNaam);aantalEindesGevonden.push(steps); console.log(`We zijn er na maar ${steps} stappen! `)};
        };
    };
    return steps;
};

function processInputText(inputText) {
    let locaties = new Map();
    let stappen = 0;
    let spookStappen = 0;
    let zzzFound = false;
    let huidigeLocatie = "AAA";
    let huidigeLocaties = [];
    let locatieStatussen = [];
    let eindGetallen = [];
    var lines = inputText.replace(/ /g, '').split('\n');
    const instructies = lines.shift().split('');;
    lines.shift(); //remove empty line
    console.log(instructies);

    lines.forEach(function(line) {
        const deel =  line.replace(/[{()}]/g, '').split('=');
        const linksRechts =  deel[1].split(',');
        locaties.set(deel[0], linksRechts);
        if(deel[0].charAt(2) === 'A'){
            console.log(`startdeel gevonden ${deel[0]}`);
            huidigeLocaties.push(deel[0]);
            locatieStatussen.push(0);
        };
    });

    while (zzzFound === false) {
        for (let index = 0; index < instructies.length; index++) {
            stappen++;
            let locatie = locaties.get(huidigeLocatie);
            const instructie = instructies[index];
            if(instructie === `L`){
                huidigeLocatie = locatie[0];
            }else{
                huidigeLocatie = locatie[1];
            };
            if(huidigeLocatie === 'ZZZ'){
                zzzFound = true;
                console.log(`We zijn er na maar ${stappen} stappen! `);
                break;
            };
        }
    };
    resultsList.push(stappen);

    for (let locatieNummer = 0; locatieNummer < huidigeLocaties.length; locatieNummer++) {
        eindGetallen.push(getSteps(huidigeLocaties[locatieNummer],instructies,locaties));
    };

    let priemenLijst = [];
    console.log(eindGetallen);
    eindGetallen.sort((a, b) => a - b); // groot naar klein
    eindGetallen.forEach(getal => {
        const priemen = primeFactors(getal);
        priemenLijst.push(priemen[0]);
        priemenLijst.push(priemen[1]);
    });
    console.log(priemenLijst);
    const priemenSet = new Set(priemenLijst);
    console.log(priemenSet);    
    const eindPriemen = Array.from(priemenSet);
    console.log(eindPriemen);
    spookStappen = eindPriemen.shift();
    eindPriemen.forEach(priem => {
        spookStappen = spookStappen * priem;
    });
    resultsList2.push(spookStappen);

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