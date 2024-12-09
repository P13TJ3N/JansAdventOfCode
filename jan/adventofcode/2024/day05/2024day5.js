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

// main loop
function processInputText(inputText) {
    //opdracht 1
    let delen = inputText.split(/\n\s*\n/)
    let regelArray = delen[0]
        .split('\n')
        .map(v => v.split('|').map(Number));

    //code om regels om te zetten in een object array
    let regels = {}
    for (let [key, value] of regelArray) {
        if(regels[key]){
            regels[key].push(value)}else{
        {regels[key] = [value];}
      };
    };
    console.log(regels);

    let updates = delen[1]
        .split('\n')
        .map(v => v.split(',').map(Number));

    console.log(updates.length);
    console.log(updates);
    
    let correcteUpdates = [];

    for(let i = 0; i < updates.length; i++){
        console.log(`---NIEUWE UPDATE---`);
        let correct = true;
        let nieuweUpdate = [];
        console.log(updates[i]);
        for(let paginaNr = 0; paginaNr < updates[i].length; paginaNr++){
            let pagina = updates[i][paginaNr];
            console.log(`---${pagina}---`);
            console.log(nieuweUpdate);

            if(nieuweUpdate.length){
                let relevanteRegels = regels[pagina];
                let filter;
                console.log(`relevanteRegels`);
                console.log(relevanteRegels);
                if(relevanteRegels){
                    filter = nieuweUpdate.filter(item => !relevanteRegels.includes(item));
                    console.log(`filter`);
                    console.log(filter.length);//dit werkt niet als er geen
                    console.log(filter);//dit werkt niet als er geen
                    if(filter.length ===  nieuweUpdate.length && correct){correct = true}else{correct = false};
                };
            };
            nieuweUpdate.push(pagina);
        };
        if(correct){
            correcteUpdates.push(nieuweUpdate);
            console.log('correcte update');
            let midden = nieuweUpdate[Math.round((nieuweUpdate.length - 1) / 2)];
            console.log(`${nieuweUpdate} -- Middelste nummer: ${midden}`);
            resultsList.push(midden);
        }else{console.log('FOUTE update >:(');};
    };
    console.log(`correcteUpdates`);
    console.log(correcteUpdates);
    
    //opdracht 2

 
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