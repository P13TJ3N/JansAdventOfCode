let resultsList = []; //vind de verste locatie die het diertje kan lopen in de loep van de start.
let resultsList2 = [];
const tekst = "som van mogelijke opstellingen is";
const tekst2 = "";
let geiserLijst = [];

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
    var lines = inputText.split('\n');
    let geisers = [];
    let opnames = []; 

    for (let index = 0; index < lines.length; index++) {
        lines[index] = lines[index].split(" ");
        geisers.push(lines[index][0]);
        opnames.push(lines[index][1]);
    };

    const geiser = geisers[0];
    const opnamenRij = opnames[0].split(",");
    const regex = /[?#]+/g;
    console.log(geiser);
    let resultArray = geiser.match(regex) || [];

    console.log(resultArray);


    //RENDER RESULT
    let renderMap = [...resultArray];
    for (let index = 0; index < geiserLijst.length; index++) {
        renderMap[index] = renderMap[index].join("");
        }
        renderMap = renderMap.join("<br>");
    renderKaart(renderMap);
};

function displayResults() {
    let resultsListSum = arrSum(resultsList);
    let resultsListSum2 = arrSum(resultsList2);
    console.log(`${tekst} : ${resultsListSum}`);
    console.log(`${tekst2} : ${resultsListSum2}`);
    //stuur info naar HTML document output
    var outputElement = document.getElementById("outputText");
    outputElement.innerHTML = `${tekst} : ${resultsListSum} <br> ${tekst2} : ${resultsListSum2}`;
};

function renderKaart(kaart) {
    //stuur info naar HTML document output
    var outputElement = document.getElementById("renderContainer");
    outputElement.innerHTML = `${kaart}`;
};