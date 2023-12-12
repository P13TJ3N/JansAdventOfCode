let resultsList = [];
let resultsList2 = [];
const tekst = "Stappen tot het einde";
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

function getOccurrence(array, value) { //https://stackoverflow.com/questions/37365512/count-the-number-of-times-a-same-value-appears-in-a-javascript-array
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}

function processInputText(inputText) {
    let locaties = [];
    let stappen = 0;
    let zzzFound = false;
    let huidigeLocatie = "AAA";
    var lines = inputText.replace(/ /g, '').split('\n');
    const instructies = lines.shift().split('');;
    lines.shift(); //remove empty line
    console.log(instructies);

    lines.forEach(function(line) {
        const deel =  line.replace(/[{()}]/g, '').split('=');
        const id = deel[0];
        const linksRechts =  deel[1].split(',');
        locaties.push({'id': id, 'linksRechts' : linksRechts});
    });

    while (zzzFound === false) {
        for (let index = 0; index < instructies.length; index++) {
            stappen++;
            let locatie = locaties.find(o => o.id === huidigeLocatie);
            const vorigeLocatie = huidigeLocatie;
            const instructie = instructies[index];
            console.log(instructie);
            if(instructie === `L`){
                huidigeLocatie = locatie.linksRechts[0];
                console.log(`stap: ${stappen}: we slaan links af van ${vorigeLocatie} naar ${huidigeLocatie}`);
            }else{
                huidigeLocatie = locatie.linksRechts[1];
                console.log(`stap: ${stappen}: we slaan rechts af van ${vorigeLocatie} naar ${huidigeLocatie}`);
            };
            if(huidigeLocatie === 'ZZZ'){
                zzzFound = true;
                console.log(`We zijn er na maar ${stappen} stappen! `);
                break
            };
        }
    };
    resultsList.push(stappen);
    // resultsList2.push();
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