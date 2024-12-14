let resultsList = [];
let resultsList2 = [];
const tekst = "som van middelste correcte updates";
const tekst2 = "som van middelste van gecorrigeerde foute updates";

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
function compareSecondColumn(a, b) { // https://stackoverflow.com/questions/16096872/how-to-sort-2-dimensional-array-by-column-value
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}

// main loop
function processInputText(inputText) {
    //opdracht 1
    let delen = inputText.split(/\n\s*\n/)
    let regelArray = delen[0]
        .split('\n')
        .map(v => v.split('|').map(Number))
        .sort(compareSecondColumn);
    console.log(regelArray);
    //code om regels om te zetten in een object array
    let regels = {}
    for (let [key, value] of regelArray) {
        if(regels[key]){
            regels[key].push(value)}else{
        {regels[key] = [value];};
      };
    };
    console.log(regels);
    //maak de mastermap
    for(let i = 0; i < masterMap.length; i++){

    };


    let eindVolgorde = []

    let updates = delen[1]
        .split('\n')
        .map(v => v.split(',').map(Number));
    let correcteUpdates = [];
    let fouteUpdates = [];
        for(let i = 0; i < updates.length; i++){
            let checkmap = [];
            let huidigeUpdate = updates[i];
            for(let master = 0; master < eindVolgorde.length; master++){
                if(huidigeUpdate.includes(eindVolgorde[master])){checkmap.push(eindVolgorde[master])};
            };

            console.log(`---NIEUWE UPDATE---`);
            let correct = true;
            let nieuweUpdate = [];
            console.log(updates[i]);
            for(let paginaNr = 0; paginaNr < updates[i].length; paginaNr++){
                let pagina = updates[i][paginaNr];
                if(nieuweUpdate.length){
                    let relevanteRegels = regels[pagina];
                    let filter;
                    if(relevanteRegels){
                        filter = nieuweUpdate.filter(item => !relevanteRegels.includes(item));
                        if(filter.length ===  nieuweUpdate.length && correct){correct = true}else{correct = false};
                    };
                };
                nieuweUpdate.push(pagina);
            };
            if(correct){
                correcteUpdates.push(nieuweUpdate);
                console.log('correcte update');
                let midden = nieuweUpdate[Math.round((nieuweUpdate.length - 1) / 2)];
                resultsList.push(midden);
            }else{
                console.log('FOUTE update >:(');
                fouteUpdates.push(checkmap);
                let midden = checkmap[Math.round((checkmap.length - 1) / 2)];
                resultsList2.push(midden);
                };
        };//4811 | 4587 - answer too low

    console.log(fouteUpdates);

    let kaart = regels;
    renderKaart(kaart);
}

function displayResults() {
    let resultsListSum = arrSum(resultsList);console.log(`${tekst} : ${resultsListSum}`);
    let resultsListSum2 = arrSum(resultsList2);console.log(`${tekst2} : ${resultsListSum2}`);
    
    //stuur info naar HTML document output
    var outputElement = document.getElementById("outputTextArea");
    outputElement.value = `${tekst} : ${resultsListSum} \n${tekst2}: ${resultsListSum2}`;
};

function renderKaart(kaart) {
    //stuur info naar HTML document render
    var outputElement = document.getElementById("renderContainer");
    outputElement.innerHTML = `${kaart}`;
};