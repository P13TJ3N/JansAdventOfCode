let resultsList = [];
let resultsList2 = [];
const tekst = "Aantal XMAS in the kruiswoord puzzel";
const tekst2 = "Aantal X-MAS in de 'kruis'woord puzzel";

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
function findXmas(arr){
    const xmasFinder = /XMAS/g //https://regexr.com/
    const samxFinder = /SAMX/g
    let matches = 0 
    for (let line = 0; line < arr.length; line++){
        let xmatches = arr[line].match(xmasFinder);
        let smatches = arr[line].match(samxFinder);
        if(xmatches){matches+=xmatches.length; console.log(`XMAS gevonden: ${xmatches}`);};
        if(smatches){matches+=smatches.length; console.log(`SAMX gevonden: ${smatches}`);};
    }
    return matches;
}
 function arrDraai45(arrString) {// dit gaat alleen werken als de array al een 2d rechthoek is 
    let arr = [];
    for (let line = 0; line < arrString.length; line++){arr.push(arrString[line].split(''))};
    let arr45 = [];
    let hoogte = arr.length;
    let breedte = arr[0].length;
    let aantalEenheden = hoogte * breedte;
    let x = 0;
    let y = 0;
    let rij = [];
    for (let eenheid = 0; eenheid < aantalEenheden; eenheid++){
        rij.push(arr[x][y]);
        if(x>0 && y<breedte-1){
            x--; y++;
        }else{
            arr45.push(rij.join("")); rij =[];
            if(arr45.length < hoogte){
                x = arr45.length; y = 0;
            }else{
                x = hoogte-1; y = (arr45.length - x);
            };
        };
    };
    return arr45
}

function processInputText(inputText) {
    //opdracht 1
    var lines = inputText.split('\n')

    let lines90 = []
    for (let line = 0; line < lines.length; line++){lines90.push(lines[line].split(''))}
    lines90 = lines90[0].map((val, index) => lines90.map(row => row[index]).reverse().join(""))//draai 90 graden

    let arr45 = arrDraai45(lines);
    let arr135 = arrDraai45(lines90);

    xmasLijst = []
    resultsList.push(findXmas(lines));
    resultsList.push(findXmas(arr45));
    resultsList.push(findXmas(lines90));
    resultsList.push(findXmas(arr135));

    //opdracht 2
    let lines2 = [];
    for (let line = 0; line < lines.length; line++){lines2.push(lines[line].split(''))};
    for (let rij = 1; rij < lines2.length-1; rij++){// skip colom 0 en rij 0, stop 1 eerder
        for (let kol = 1; kol < lines2[rij].length-1; kol++){
            if(lines2[rij][kol] === 'A'){
                    if(
                        ((lines2[rij-1][kol-1] === 'M' && lines2[rij+1][kol+1] === 'S') ||
                        (lines2[rij-1][kol-1] === 'S' && lines2[rij+1][kol+1] === 'M')) &&

                        ((lines2[rij+1][kol-1] === 'M' && lines2[rij-1][kol+1] === 'S') ||
                        (lines2[rij+1][kol-1] === 'S' && lines2[rij-1][kol+1] === 'M'))
                    ){resultsList2.push(1)};
            };
        };
    };
    console.log(lines2);
    let kaart = resultsList;
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