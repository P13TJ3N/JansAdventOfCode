let resultsList = [];
let resultsList2 = [];
const tekst = "vermenigvuldiging van antwoorden";
const tekst2 = "totale antwoord";

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

function arrMultiply(arr) { 
    return arr.reduce(function(a, b) {
        return a * b;
    }, 0);
}

function abcFormule(time,distance){
    let discriminant = (time**2)-(4*distance);
    let min = (time-Math.sqrt(discriminant))/2
    if(min === Math.ceil(min)){min +=1;}else{min = Math.ceil(min);};
    let max = (time+Math.sqrt(discriminant))/2
    if(max === Math.ceil(max)){max -=1;}else{max = Math.ceil(max);};
    let aantalOplossingen = max-min;
    return(aantalOplossingen);
}

function processInputText(inputText) {
    let input = [];
    let output = [];
    let lineNr = 0;
    var lines = inputText.replace(/;/g,",").split('\n'); //replacing all semicolons with commas to split lines by commas

    lines.forEach(function(line) {
        let cleanLine = line.trim().split(/[\s,\t,\n]+/).join(' ');
        let splitline = cleanLine.split(': '); //seperate game prefix
        input[lineNr] = splitline[1].split(" ");
        lineNr++;
    });
    console.log(input);

    //oplossing1
    for (let i = 0; i < input[0].length; i++) {
        let time = parseInt(input[0][i]);
        let distance = parseInt(input[1][i]);
        output.push(abcFormule(time,distance));
    };
    let multiplication = output.reduce((a, b)=> a*b, 1)
    resultsList.push(multiplication);
    
    //oplossing2
    let time = parseInt(arrSum(input[0]));
    let distance = parseInt(arrSum(input[1]));
    resultsList2.push(abcFormule(time,distance));
}

function displayResults() {
    let resultsListSum = arrSum(resultsList);
    let resultsListSum2 = arrSum(resultsList2);
    console.log(`${tekst} : ${resultsListSum}`);
    console.log(`${tekst2} : ${resultsListSum2}`);
    //stuur info naar HTML document output
    var outputElement = document.getElementById("outputText");
    outputElement.textContent = `${tekst} : ${resultsListSum} \n ${tekst2} : ${resultsListSum2}`;
};