let resultsList = [];
let resultsList2 = [];
const tekst = "assignment pairs does one range fully contain the other";
const tekst2 = "assignment pairs do the ranges overlap";

const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
let backpack = [];
let counter = 1;

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

function comapritor(line1,line2,opdracht){
    let line1Split = line1.split("-").map(Number);
    let line2Split = line2.split("-").map(Number);
    if(line1Split[0] >= line2Split[0] && line1Split[1] <= line2Split[1]){
        console.log(`${line1} past in ${line2}`);
        console.log(`${line1Split[0]} is equal or greater than ${line2Split[0]}`);
        console.log(`${line1Split[1]} is equal or smaller than ${line2Split[1]}`); 
        return 1;
    }else if(line1Split[1] >= line2Split[1] && line1Split[0] <= line2Split[0]){
        console.log(`${line2} past in ${line1}`);
        console.log(`${line1Split[1]} is equal or greater than ${line2Split[1]}`);
        console.log(`${line1Split[0]} is equal or smaller than ${line2Split[0]}`); 
        return 1;
    }else if(opdracht && line1Split[1] >= line2Split[0] && line1Split[0] <= line2Split[1]){//
        console.log(`${line2} overlapt links met ${line1}`);
        return 1;
    }else if(opdracht && line2Split[1] >= line1Split[0] && line2Split[0] <= line1Split[1]){//
        console.log(`${line2} overlapt rechts met ${line1}`);
        return 1;
    }else {console.log(`no match found comparing ${line1} and ${line2}`); return 0;};
}

function processInputText(inputText) {
    var lines = inputText.split('\n')//split

    //opdracht1
    lines.forEach(function(line) {
        let lines = line.split(",");
        let line1 = lines[0];
        let line2 = lines[1];
        resultsList.push(comapritor(line1, line2, false)); 
    })
    //opdracht2
    lines.forEach(function(line) {
        let lines = line.split(",");
        let line1 = lines[0];
        let line2 = lines[1];
        resultsList2.push(comapritor(line1, line2, true)); 
    })
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