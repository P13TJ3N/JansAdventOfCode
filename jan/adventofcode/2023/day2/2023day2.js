let resultsList = [];
let resultsList2 = [];
const redLimit = 12, greenLimit = 13, blueLimit = 14;

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

    lines.forEach(function(line) {
        let gameIsPossible = false;
        let splitline = line.split(':'); //seperate game prefix
        let gameId = splitline[0].replace('Game ','');
        let games = splitline[1].split(',');
        let maxRed = 0, maxGreen = 0, maxBlue = 0;
        games.forEach(function(game) {
            gameNumber = parseInt(game.replace(/\D/g,'')); //hou alleen getallen over
            gamecolour = game.replace(/[^a-z]/gi, ''); //hou alleen letters over
            switch(gamecolour){
                case 'red':
                    if(gameNumber > maxRed){maxRed = gameNumber};
                    break;
                case 'green':
                    if(gameNumber > maxGreen){maxGreen = gameNumber};
                    break;
                case 'blue':
                    if(gameNumber > maxBlue){maxBlue = gameNumber};
                    break;
            };
        });
        let powerSet =  maxRed * maxGreen * maxBlue;
        if(maxRed <= redLimit && maxGreen <= greenLimit && maxBlue <= blueLimit){gameIsPossible = true};
        if(gameIsPossible){resultsList.push(parseInt(gameId));};
        resultsList2.push(parseInt(powerSet)); 
    });
}

function displayResults() {
    let resultsListSum = arrSum(resultsList);
    let resultsListSum2 = arrSum(resultsList2);
    console.log(`De som van de mogelijke spellen is:${resultsListSum}`);
    console.log(`De som van de powersets is ${resultsListSum2} \n dit bestaat uit:${resultsList2}`);
    //stuur info naar HTML document output
    var outputElement = document.getElementById("outputText");
    outputElement.textContent = `De som van de mogelijke spellen is:${resultsListSum} \n\n De som van de minimale kwadraatsets spellen is:${resultsListSum2} \n`;
}