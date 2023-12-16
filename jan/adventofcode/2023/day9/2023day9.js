let controleLijst = [];
let resultsList = [];
let resultsList2 = [];
const tekst = "Stappen tot het einde";
const tekst2 = "Spookstappen tot het einde";
let opnameRij = 0;
let verschillenLijst = [];

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
    var lines = inputText.split('\n');
    let polynomialen = []; 

    lines.forEach(function(line) {
        let diepte = 0;
        polynomialen[opnameRij] = [];
        let bodenGevonden = false;
        opnamenLijst =  line.split(" ").map(function(item) {return parseInt(item, 10);})//split en verander in getallen
        // console.log(opnamenLijst)
        polynomialen[opnameRij][diepte] = [];
        polynomialen[opnameRij][diepte] = opnamenLijst;
        // console.log(polynomialen[opnameRij][diepte]);
        // console.log(polynomialen[opnameRij][diepte].length);
        while(bodenGevonden === false){
            polynomialen[opnameRij][diepte+1] = []
                for (let index = 1; index < polynomialen[opnameRij][diepte].length; index++) {// index = 1; Slaat eerste getal over
                    const opname = polynomialen[opnameRij][diepte][index];
                    const vorigeOpname = polynomialen[opnameRij][diepte][index-1];
                    const verandering = opname - vorigeOpname;
                    // console.log(`${opname}-${vorigeOpname} = ${verandering} `);
                    polynomialen[opnameRij][diepte+1].push(verandering);
                };
            // console.log(polynomialen[opnameRij][diepte+1]);
            if(Math.min(...polynomialen[opnameRij][diepte+1]) === Math.max(...polynomialen[opnameRij][diepte+1])){
                for (let index = diepte; index > -1; index--) {                    
                    //deel 1
                    const ondersteRij = polynomialen[opnameRij][index];
                    const bovensteRij = polynomialen[opnameRij][index+1];
                    const niewGetal = ondersteRij.at(-1) + bovensteRij.at(-1);
                    polynomialen[opnameRij][index].push(niewGetal);
                    
                    //deel 2
                    const ondersteRij2 = polynomialen[opnameRij][index];
                    const bovensteRij2 = polynomialen[opnameRij][index+1];
                    const niewGetal2 = ondersteRij2.at(0) - bovensteRij2.at(0);
                    polynomialen[opnameRij][index].unshift(niewGetal2);                   
                    bodenGevonden = true;
                };
            };
            diepte++;
        };
        console.log(`we voegen ${polynomialen[opnameRij][0].at(-1)} toe aan de eindscore`)
        resultsList.push(polynomialen[opnameRij][0].at(-1));
        resultsList2.push(polynomialen[opnameRij][0].at(0));
        opnameRij++;
    });
    resultsList.sort(function(a, b) {return a - b;});
    console.log(polynomialen);
    console.log(resultsList);

    // resultsList2.push(spookStappen);
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