
let resultsList = []; //vind de verste locatie die het diertje kan lopen in de loep van de start.
let resultsList2 = [];
const tekst = "Verste afstand van het konijn is";
const tekst2 = "";

const optiesBoven =  [`║`,`╗`,`╔`];
const optiesOnder =  [`║`,`╝`,`╚`];
const optiesLinks =  [`═`,`╔`,`╚`];
const optiesRechts = [`═`,`╗`,`╝`];
let richting = [];

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

function Empty2DArray(rows, cols) { 
    return Array.from({ length: rows }, 
        () => Array(cols).fill(0)); 
}

function navigatie(x,y,lines,richting){
    let opties = "";
    const huidigePijp = lines[y][x];
    const boven  = lines[y-1][x];
    const onder  = lines[y+1][x];
    const links  = lines[y][x-1];
    const rechts = lines[y][x+1];
    console.log(`${lines[y-1][x-1]}${lines[y-1][x]}${lines[y-1][x+1]}`);
    console.log(`${lines[y][x-1]}${lines[y][x]}${lines[y][x+1]}`);
    console.log(`${lines[y+1][x-1]}${lines[y+1][x]}${lines[y+1][x+1]}`);

    if(optiesBoven.includes(boven)&&!(richting === "⬇")&&!(['═','╔','╗'].includes (huidigePijp))){opties += "⬆"};
    if(optiesOnder.includes(onder)&&!(richting === "⬆")&&!(['═','╝','╚'].includes(huidigePijp))){opties += "⬇"};
    if(optiesLinks.includes(links)&&!(richting === "➡")&&!(['║','╔','╚'].includes(huidigePijp))){opties += "⬅"};
    if(optiesRechts.includes(rechts)&&!(richting === "⬅")&&!(['║','╝','╗'].includes(huidigePijp))){opties += "➡"};
    return(opties);
};

function processInputText(inputText) {
    const diertjekarakter ="╬";
    inputText = inputText
             .replace(/J/g,"╝")
             .replace(/L/g,"╚")
             .replace(/F/g,"╔")
             .replace(/7/g,"╗")
             .replace(/-/g,"═")
             .replace(/\|/g,"║")
             .replace("S",`${diertjekarakter}`);

    var lines = inputText.split('\n');
    let  nepLijn = "";
    for (let index = 0; index < lines[0].length; index++) {nepLijn += "." };
    lines.push(nepLijn);
    lines.unshift(nepLijn);
    let xDiertje = 0;
    let yDiertje = 0;
    for (let index = 0; index < lines.length; index++) {
        lines[index] = "."+lines[index]+"." ;
        const line = lines[index];
        if(line.includes(diertjekarakter)){yDiertje = index; xDiertje = line.indexOf(diertjekarakter);}
        // lines[index] = lines[index].split("");
    }
    const kaartLengte = lines.length;
    const kaartBreeddte = lines[0].length;
    let scoremap = Empty2DArray(kaartLengte,kaartBreeddte);
    scoremap[yDiertje][xDiertje] = 1;
    var kaart = lines.join('<br>');
    renderKaart(kaart);
    console.log(`het diertje is op plek ${xDiertje}${xDiertje}`);
    
    let konijnen = navigatie(xDiertje,yDiertje,lines,"start");
    console.log(konijnen);
    console.log(konijnen.length);
    let spookRichtingen = konijnen.split('');
    console.log(` de spookrichtingen zijn ${spookRichtingen}`);

    // release the ghost bunnies! >:D
    console.log(`=== release the ghost bunnies! >:D === `);
    let spookKonijnen = [];
    for (let index = 0; index < spookRichtingen.length; index++) {
        console.log(`konijn ${index} kijkt nu wat die moet doen`)
        let x = xDiertje;
        let y = yDiertje;
        if(spookRichtingen[index] === "⬆"){y--}
        else if(spookRichtingen[index] === "⬇"){y++}
        else if(spookRichtingen[index] === "⬅"){x--}
        else if(spookRichtingen[index] === "➡"){x++}
        else{console.log(`dit konijn heeft geen idee waar te starten :(`)};
        spookKonijnen[index] = [x,y];
        console.log(`konijn ${index} gaat naar ${spookRichtingen[index]}`);
        scoremap[y][x] = 1;
    };

    //main loop
    let stappen = 1;
    let langestAfstandGevonden = false;
    console.log(`=== main loop === `);
    while(langestAfstandGevonden === false){
        stappen++;
        for (let konijn = 0; konijn < spookKonijnen.length; konijn++) {
            let x = spookKonijnen[konijn][0];
            let y = spookKonijnen[konijn][1];
            console.log(spookRichtingen[konijn]);
            console.log(`konijn ${konijn} ging naar ${spookRichtingen[konijn]} en staat nu op ${x},${y} `);
            spookRichtingen[konijn] = navigatie(x,y,lines,spookRichtingen[konijn]);
            if(spookRichtingen[konijn] === "⬆"){y--}
            else if(spookRichtingen[konijn] === "⬇"){y++}
            else if(spookRichtingen[konijn] === "⬅"){x--}
            else if(spookRichtingen[konijn] === "➡"){x++}
            else{console.log(`dit konijn heeft geen idee wat die moet doen :(`)};
            spookKonijnen[konijn] = [x,y];
            if(scoremap[y][x] > 0){langestAfstandGevonden = true; break};
            scoremap[y][x] = stappen;
        };
    };
    maxScore = 0;
    cleanMap = scoremap;
    for (let index = 0; index < lines.length; index++) {
        const max = Math.max(...scoremap[index]);
        if(max>maxScore)(maxScore=max)
        for (let score = 0; score < cleanMap[index].length; score++) {
            if(cleanMap[index][score] > 0){cleanMap[index][score] = lines[index][score]};
        }
        cleanMap[index] = cleanMap[index].join("");
    }
    cleanMap = cleanMap.join('<br>');
    console.log(scoremap);
    resultsList.push(maxScore);
    
    // part 2
    renderKaart(cleanMap);
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