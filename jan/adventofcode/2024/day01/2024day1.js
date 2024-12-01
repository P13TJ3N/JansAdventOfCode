let resultsList = [];
let resultsList2 = [];
const tekst = "Het verschil tussen alle locaties van klein naar groot:";
const tekst2 = "";
listA = []
listB = []

function calculateResult() {
    var inputElement = document.getElementById("inputTextArea");// haal Input waarden op
    var inputText = inputElement.value;
    processInputText(inputText);// verwerk input waarden
    displayResults();// geef resultaat terug aan webpagina en console.log
}
//functions
function arrSum(arr) { 
    return arr.reduce(function(a, b) {
        return a + b;
    }, 0);
}

function arrTimes(arr) { 
    return arr.reduce(function(a, b) {
        return a * b;
    }, 0);
}

function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

//per lijn
function processInputText(inputText) {
    var lines = inputText.split('\n')

    //opdracht1
    for (let line = 0; line < lines.length; line++){
        split = lines[line].split('   ');
        listA.push(parseInt(split[0]));
        listB.push(parseInt(split[1]));
    }

    listA.sort(function(a, b){return a - b});
    listB.sort(function(a, b){return a - b});

    for (let i = 0; i < listA.length; i++){
            let verschil = Math.abs(listA[i]-listB[i]);
            resultsList.push(verschil)
        }
        
    //opdracht2
    uniekeListA = [];
    for (let i = 0; i < listA.length; i++) {
        if (!uniekeListA.includes(listA[i])) {
            uniekeListA.push(listA[i]);
        }
    }
    
    for (let a = 0; a < uniekeListA.length; a++){
        let matchList = listB.filter(function(value){ return value === uniekeListA[a]});
        if(matchList && matchList.length > 0){
           resultsList2.push((matchList.length * uniekeListA[a]));
        }
    }

    //RENDER RESULT
    let kaart = ':D'
    renderKaart(kaart);
}

function displayResults() {
    let resultsListSum = arrSum(resultsList);
    let resultsListSum2 = arrSum(resultsList2);
    console.log(`${tekst} : ${resultsListSum}`);
    console.log(`${tekst2} : ${resultsListSum2}`);
    //stuur info naar HTML document output
    var outputElement = document.getElementById("outputTextArea");
    outputElement.value = `${tekst} : ${resultsListSum} \n${tekst2} : ${resultsListSum2}`;
};

function renderKaart(kaart) {
    //stuur info naar HTML document render
    var outputElement = document.getElementById("renderContainer");
    outputElement.innerHTML = `${kaart}`;
};