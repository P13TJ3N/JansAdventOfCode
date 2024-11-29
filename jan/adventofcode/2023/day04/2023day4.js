let resultsList = [];
let resultsList2 = [];
const tekst = "Matches op de kaarten";
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
    var lines = inputText.replace(/;/g,",").split('\n'); //replacing all semicolons with commas to split lines by commas
    var keerSpelen = [];
    console.log(lines.length);
    
    for (let i = 1; i < lines.length+1; i++){keerSpelen[i] = 1;};
    console.log(keerSpelen);

    lines.forEach(function(line) {
        let cleanLine = line.trim().split(/[\s,\t,\n]+/).join(' ');
        let splitline = cleanLine.split(': '); //seperate game prefix
        let gameId = splitline[0].replace('Card ','');
        let sides = splitline[1].split(' | ');
        let winningNumbers = sides[0].split(" ");
        let checkingNumbers = sides[1].split(" ");

        let matchesOpDezeKaart = 0;
        let score = 0;

        checkingNumbers.forEach(function(number) {
            console.log(`bestaat ${number} in "${winningNumbers}"`);
            if(winningNumbers.includes(number)){
                if(score==0){score++} else{
                    score = score*2;
                }
                matchesOpDezeKaart++;
            };
        });

        console.log(`Kaart${gameId}:  Aantal matches ${matchesOpDezeKaart}`);
        
        for (let i = 1; i < matchesOpDezeKaart+1; i++){
            huidigeKaart = parseInt(gameId) + i; 
            keerSpelen[huidigeKaart] += keerSpelen[parseInt(gameId)];
        };
        resultsList.push(score);
        resultsList2.push(parseInt(keerSpelen[parseInt(gameId)]));
        console.log(resultsList2);
    });
    
}

function displayResults() {
    let resultsListSum = arrSum(resultsList);
    let resultsListSum2 = arrSum(resultsList2);
    console.log(`${tekst} : ${resultsListSum}`);
    console.log(`${tekst2} : ${resultsListSum2}`);
    //stuur info naar HTML document output
    var outputElement = document.getElementById("outputText");
    outputElement.textContent = `${tekst} : ${resultsListSum} \n ${tekst2} : Er zijn ${resultsListSum2} kaarten`;
};