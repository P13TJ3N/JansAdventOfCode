// test input
// 55555 765
// 44449 684
// 33322 28
// 33392 220
// 33229 220
// 22934 483
// 92345 483


let resultsList = [];
let resultsList2 = [];
const tekst = "Totale som van kaarten bidwaarde is";
const tekst2 = "";
const kaartWaardenLookup = {
    'A' : '13',
    'K' : '12',
    'Q' : '11',
    'J' : '10',
    'T' : '09',
    '9' : '08',
    '8' : '07',
    '7' : '06',
    '6' : '05',
    '5' : '04',
    '4' : '03',
    '3' : '02',
    '2' : '01'
};

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
    let kaarten = [];

    lines.forEach(function(line) {
        const cleanLine = line.split(" ");
        const kaartArray = cleanLine[0].split("");
        const bidWaarde = parseInt(cleanLine[1]);
        const handWaarden = kaartArray.map(item => kaartWaardenLookup[item[0]])

        //zie welke unieke kaarten er zijn en hoe vaak die bestaan
        let uniekeKaarten = [...new Set(handWaarden)];
        let aantalKeerGespeeld = [];

        for (let kaartNr = 0; kaartNr < uniekeKaarten.length; kaartNr++) {
            aantalKeerGespeeld.push(getOccurrence(handWaarden,uniekeKaarten[kaartNr]));
        };
        let sorteerwaarde = "";
        let handType = 1;

        //kijk wat voor type hand er gespeeld wordt
        //plak type hand waarden voor de concat handwaarden
        if(uniekeKaarten.length === 1){
            console.log("5 of a kind!");
            handType = 7;
        }else if(aantalKeerGespeeld.includes(4)){
            console.log("4 of a kind!");
            handType = 6;
        }else if(aantalKeerGespeeld.includes(3)&&aantalKeerGespeeld.includes(2)){
            console.log("full house!");
            handType = 5;
        }else if(aantalKeerGespeeld.includes(3)){
            console.log("3 of a kind!");
            handType = 4;
        }else if(getOccurrence(aantalKeerGespeeld,2) === 2){
            console.log("2 pairs!");
            handType = 3;
        }else if(aantalKeerGespeeld.includes(2)){
            console.log("one pair!");
            handType = 2;
        }else {
            console.log("wtf get out of here with this pleb shit");
        };
        sorteerwaarde =  parseInt(handType+handWaarden.join(""));
        kaarten.push({'sorteerwaarde': sorteerwaarde, 'handType' : handType, 'handWaarden': handWaarden ,'bidwaarden' : bidWaarde, 'kaart':kaartArray});
    });
    kaarten.sort((a,b) => a.sorteerwaarde - b.sorteerwaarde); // b - a for reverse sort -  https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
    for (let i = 0; i < kaarten.length; i++) {
        const kaart = kaarten[i];
        const  bidwaarde = kaart.bidwaarden;
        const rang =  bidwaarde * (i+1)
        console.log(kaart);
        console.log(`${bidwaarde} keer ${(i+1)} = ${rang}`);
        resultsList.push(rang);
    }
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