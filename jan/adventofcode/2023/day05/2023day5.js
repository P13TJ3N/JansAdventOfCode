let resultsList = [];
const tekst = "De kleinste grondlocatie is";

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
    var seedMap = inputText.split(/\n\s*\n/); //split als er een lege regel is
    let seeds = seedMap.shift().split(" "); //haal zaad uit eerste eerste lijn 
    let endSeedList = []
    seeds.shift(); //verwijder pre-fix
    console.log(`gevonden zaden: ${seeds}`);

    let seedPathCheck = [];
    let seedDebugCount = 0;

    seeds.forEach(function(seed) {
        seedInt = parseInt(seed);
        console.log(`zaad ${seedInt} wordt nu verwerkt`);
        seedPathCheck[seedDebugCount] = [];
        seedPathCheck[seedDebugCount].push(parseInt(seed));

        seedMap.forEach(function(map) {
            var lines = map.split('\n');
            let currentMap = lines.shift();
            console.log(`processing ${currentMap}`);

            for (let i = 0; i < lines.length; i++) {
                mapItem = lines[i].split(" ");
                console.log(mapItem);
                let destinationRangeStart = parseInt(mapItem[0]);
                let range  = parseInt(mapItem[2]);
                let sourceRangeStart = parseInt(mapItem[1]);
                let sourceRangeEnd = sourceRangeStart+range;
                if(seedInt >= sourceRangeStart && seedInt <= sourceRangeEnd){
                    afwijking = (destinationRangeStart - sourceRangeStart);
                    debug = (seedInt);
                    seedInt += afwijking;
                    console.log(`${debug} is tussen ${sourceRangeStart} en ${sourceRangeEnd} en wordt nu ${seedInt}`);
                    break;
                };
        }
            seedPathCheck[seedDebugCount].push(seedInt);
        });
        endSeedList.push(seedInt);
        seedDebugCount++;
    });
    let sortedSeeds = endSeedList.sort(function(a, b) {return a - b;});
    smallestSeed = parseInt(sortedSeeds[0]);
    resultsList.push(smallestSeed);
    console.log(`we volgde deze volgorde:`);
    console.log(seedPathCheck);
    
}

function displayResults() {
    let resultsListSum = arrSum(resultsList);
    console.log(`${tekst} : ${resultsListSum}`);
    console.log(`${tekst2} : ${resultsListSum2}`);
    //stuur info naar HTML document output
    var outputElement = document.getElementById("outputText");
    outputElement.textContent = `${tekst} : ${resultsListSum}`
};