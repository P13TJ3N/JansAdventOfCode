let resultsList = [];
let resultsList2 = [];
const tekst = "Totale som van kaarten bidwaarde is";
const tekst2 = "Totale som van kaarten bidwaarde met Jokers is";

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

const kaartWaardenLookup2 = {
    'A' : '13',
    'K' : '12',
    'Q' : '11',
    'J' : '01',
    'T' : '10',
    '9' : '09',
    '8' : '08',
    '7' : '07',
    '6' : '06',
    '5' : '05',
    '4' : '04',
    '3' : '03',
    '2' : '02'
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
    let kaarten2 = [];

    lines.forEach(function(line) {
        const cleanLine = line.split(" ");
        const kaartArray = cleanLine[0].split("");
        const bidWaarde = parseInt(cleanLine[1]);
        const handWaarden = kaartArray.map(item => kaartWaardenLookup[item[0]]);
        const handWaarden2 = kaartArray.map(item => kaartWaardenLookup2[item[0]]);
        
        console.log(handWaarden);
        console.log(`aantal jokers: ${getOccurrence(handWaarden2,"01")}`)

        
        //zie welke unieke kaarten er zijn en hoe vaak die bestaan
        let uniekeKaarten = [...new Set(handWaarden)];
        let uniekeKaarten2 = [...new Set(handWaarden2)];
        let aantalKeerGespeeld = [];
        let aantalKeerGespeeld2 = [];

        for (let kaartNr = 0; kaartNr < uniekeKaarten.length; kaartNr++) {
            aantalKeerGespeeld.push(getOccurrence(handWaarden,uniekeKaarten[kaartNr]));
        };
        for (let kaartNr = 0; kaartNr < uniekeKaarten2.length; kaartNr++) {
            aantalKeerGespeeld2.push(getOccurrence(handWaarden2,uniekeKaarten2[kaartNr]));
        };
        let sorteerwaarde = "";
        let sorteerwaarde2 = "";
        let handType = 1;
        let handType2 = 1;
        //hand type zonder jokers
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
        
        // hand type met joker
        if(uniekeKaarten2.length === 1){
            console.log("5 of a kind!");
            handType2 = 7;
        }else if(aantalKeerGespeeld2.includes(4)){
            if(uniekeKaarten2.includes("01")){
                handType2 = 7;
                console.log("5 of a kind!");
            }else{
                handType2 = 6;
                console.log("4 of a kind!");
            };
        }else if(aantalKeerGespeeld2.includes(3)&&aantalKeerGespeeld2.includes(2)){
            if(uniekeKaarten2.includes("01")){
                handType2 = 7;
                console.log("5 of a kind!");
            }else{
                console.log("full house!");
                handType2 = 5;
            };
        }else if(aantalKeerGespeeld2.includes(3)){
            if(uniekeKaarten2.includes("01")){
                handType2 = 6;
                console.log("4 of a kind!");
            }else{
                console.log("3 of a kind!");
                handType2 = 4;
            };
            // dit kan 2 pair, 4 of a kind, of full house zijn
        }else if(getOccurrence(aantalKeerGespeeld2,2) === 2){
            if(getOccurrence(handWaarden2,"01") === 2 ){
                console.log("4 of a kind!");
                console.log(`deze 4 of a kind bestaat uit 2 jokers`);
                handType2 = 6;
            }else if(getOccurrence(handWaarden2,"01") === 1 ){
                console.log("full house!");
                handType2 = 5;
            }else{
                console.log("2 pairs!");
                handType2 = 3;
            };
            //dit kan 1 pair or 3 of a kind zijn
        }else if(aantalKeerGespeeld2.includes(2)){
            if(uniekeKaarten2.includes("01") ){
                console.log("3 of a kind!");
                handType2 = 4;
            }else{
                console.log("one pair!");
                handType2 = 2;
            };
            //dit kan high card or one pair zijn
        }else if(uniekeKaarten2.includes("01")){
            console.log("one pair!");
            handType2 = 2;
        }else{
            console.log("wtf get out of here with this pleb shit");
        };
        sorteerwaarde2 =  parseInt(handType2+handWaarden2.join(""));
        kaarten2.push({'sorteerwaarde': sorteerwaarde2, 'handType' : handType2, 'handWaarden': handWaarden2 ,'bidwaarden' : bidWaarde, 'kaart':kaartArray});
    });

    kaarten.sort((a,b) => a.sorteerwaarde - b.sorteerwaarde); // b - a for reverse sort -  https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
    kaarten2.sort((a,b) => a.sorteerwaarde - b.sorteerwaarde);
    for (let i = 0; i < kaarten.length; i++) {
        const kaart = kaarten[i];
        const bidwaarde = kaart.bidwaarden;
        const rang =  bidwaarde * (i+1)
        console.log(kaart);
        console.log(`${bidwaarde} keer ${(i+1)} = ${rang}`);
        resultsList.push(rang);
    };
    for (let i = 0; i < kaarten2.length; i++) {
        const kaart2 = kaarten2[i];
        const bidwaarde2 = kaart2.bidwaarden;
        const rang2 =  bidwaarde2 * (i+1)
        console.log(kaart2);
        console.log(`${bidwaarde2} keer ${(i+1)} = ${rang2}`);
        resultsList2.push(rang2);
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