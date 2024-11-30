
let resultsList = []; //vind de verste locatie die het diertje kan lopen in de loep van de start.
let resultsList2 = [];
const tekst = "Verste afstand van het konijn is";
const tekst2 = "De grootte van het konijnenhol is";
let megaMap = [];

const optiesBoven =  [`║`,`╗`,`╔`];
const optiesOnder =  [`║`,`╝`,`╚`];
const optiesLinks =  [`═`,`╔`,`╚`];
const optiesRechts = [`═`,`╗`,`╝`];
let richting = [];

//║
const upDown = [
    ['░░','██','░░'],
    ['░░','██','░░'],
    ['░░','██','░░']]
//═
const leftRight = [
    ['░░','░░','░░'],
    ['██','██','██'],
    ['░░','░░','░░']]
//╗
const downLeft = [
    ['░░','░░','░░'],
    ['██','██','░░'],
    ['░░','██','░░']]
//╔
const downRight = [
    ['░░','░░','░░'],
    ['░░','██','██'],
    ['░░','██','░░']]
//╚
const upRight = [
    ['░░','██','░░'],
    ['░░','██','██'],
    ['░░','░░','░░']]
//╝
const upLeft = [
    ['░░','██','░░'],
    ['██','██','░░'],
    ['░░','░░','░░']]
//0
const emptySpace = [
    ['░░','░░','░░'],
    ['░░','KH','░░'],
    ['░░','░░','░░']]

function superSizeMe(lines){
    let megaMap = [];
    let megalLine = 0;
    
    for (let row = 0; row < lines.length; row++) {
        megaMap[megalLine]   = [];
        megaMap[megalLine+1] = [];
        megaMap[megalLine+2] = [];
        for (let col = 0; col < lines[0].length; col++) {
            let megaBlock =[];
            const element = lines[row][col];
                 if(element==="║"){megaBlock = upDown;}
            else if(element==="═"){megaBlock = leftRight;}
            else if(element==="╗"){megaBlock = downLeft;}
            else if(element==="╔"){megaBlock = downRight;}
            else if(element==="╚"){megaBlock = upRight;}
            else if(element==="╝"){megaBlock = upLeft;}
                              else{megaBlock = emptySpace;
            };
            megaMap[megalLine].push(...megaBlock[0]);
            megaMap[megalLine+1].push(...megaBlock[1]);
            megaMap[megalLine+2].push(...megaBlock[2]);
        };
        megalLine += 3;
    };
    return megaMap;
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
    if(optiesBoven.includes(boven)&&!(richting === "⬇")&&!(['═','╔','╗'].includes (huidigePijp))){opties += "⬆"};
    if(optiesOnder.includes(onder)&&!(richting === "⬆")&&!(['═','╝','╚'].includes(huidigePijp))){opties += "⬇"};
    if(optiesLinks.includes(links)&&!(richting === "➡")&&!(['║','╔','╚'].includes(huidigePijp))){opties += "⬅"};
    if(optiesRechts.includes(rechts)&&!(richting === "⬅")&&!(['║','╝','╗'].includes(huidigePijp))){opties += "➡"};
    return(opties);
};

function vul(x,y,lines){
    let opties = [];
    //check boven
    if(y > 0){if(lines[y-1][x] === '░░'||lines[y-1][x] === 'KH'){megaMap[y-1][x] = '▒▒'; opties.push([y-1,x]);};};
    //check onder
    if(y < lines.length-1){if(lines[y+1][x] === '░░'||lines[y][x-1] === 'KH'){megaMap[y+1][x] = '▒▒'; opties.push([y+1,x]);};};
    //check links
    if(x > 0){if(lines[y][x-1] === '░░'|lines[y][x-1] === 'KH'){megaMap[y][x-1] = '▒▒'; opties.push([y,x-1]);};};
    //check rechts
    if(x < lines[0].length){if(lines[y][x+1] === '░░'||lines[y][x-1] === 'KH'){megaMap[y][x+1] = '▒▒'; opties.push([y,x+1]);};};
    if(opties.length>0){
        return(opties);
    }else{
        return(null);
    };
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
    console.log(lines[yDiertje]);
    lines[yDiertje] = lines[yDiertje].split("");
    console.log(lines[yDiertje]);
         if(konijnen.includes("⬇")&&konijnen.includes("⬆")){lines[yDiertje][xDiertje] = '║';console.log(`knijn is ${lines[yDiertje][xDiertje]}`);}
    else if(konijnen.includes("⬅")&&konijnen.includes("➡")){lines[yDiertje][xDiertje] = '═';console.log(`knijn is ${lines[yDiertje][xDiertje]}`);}
    else if(konijnen.includes("⬅")&&konijnen.includes("⬆")){lines[yDiertje][xDiertje] = '╝';console.log(`knijn is ${lines[yDiertje][xDiertje]}`);}
    else if(konijnen.includes("⬆")&&konijnen.includes("➡")){lines[yDiertje][xDiertje] = '╚';console.log(`knijn is ${lines[yDiertje][xDiertje]}`);}
    else if(konijnen.includes("⬇")&&konijnen.includes("➡")){lines[yDiertje][xDiertje] = '╔';console.log(`knijn is ${lines[yDiertje][xDiertje]}`);}
    else if(konijnen.includes("⬅")&&konijnen.includes("⬇")){lines[yDiertje][xDiertje] = '╗';console.log(`knijn is ${lines[yDiertje][xDiertje]}`);}
    lines[yDiertje] = lines[yDiertje].join("");
    let spookRichtingen = konijnen.split('');

    // release the ghost bunnies! >:D
    console.log(`=== release the ghost bunnies! >:D === `);
    let spookKonijnen = [];
    for (let index = 0; index < spookRichtingen.length; index++) {
        let x = xDiertje;
        let y = yDiertje;
        if(spookRichtingen[index] === "⬆"){y--}
        else if(spookRichtingen[index] === "⬇"){y++}
        else if(spookRichtingen[index] === "⬅"){x--}
        else if(spookRichtingen[index] === "➡"){x++}
        spookKonijnen[index] = [x,y];

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
    let maxScore = 0;
    let cleanMap = scoremap;
    let renderMap = cleanMap;
    for (let index = 0; index < lines.length; index++) {
        const max = Math.max(...scoremap[index]);
        if(max>maxScore)(maxScore=max)
        for (let score = 0; score < cleanMap[index].length; score++) {
            if(cleanMap[index][score] > 0){cleanMap[index][score] = lines[index][score]};
        }
    }
    resultsList.push(maxScore);

    // part 2 -- https://en.wikipedia.org/wiki/Flood_fill

    //SUPERSIZE DE MAP
    console.log(`megaMap wordt gemaakt`);
    megaMap = superSizeMe(cleanMap);

    //paint fill van buiten naar binnen
    megaMap[0][0] = '▒▒';
    let pixels = []
    pixels.push([0,0])
    while(true){
        console.log(megaMap);
        for (let index = 0; index < pixels.length; index++) {
            const pixel = pixels.shift();
            const x = pixel[1];
            const y = pixel[0];
            const newpixel = vul(x,y,megaMap);
            if(newpixel){
                for (let index = 0; index < newpixel.length; index++) {
                    pixels.push(newpixel[index]);
                };
            };
        };
        if(pixels.length === 0){break;};
    };

    let maxScore2 = 0;
    for (let rij = 0; rij < megaMap.length; rij++) {
        for (let col = 0; col < megaMap[0].length; col++) {
            const cel = megaMap[rij][col];
            if(cel === 'KH'){maxScore2++}; 
        }
    }
    resultsList2.push(maxScore2);

    //Render de map
    for (let index = 0; index < megaMap.length; index++) {
        megaMap[index] = megaMap[index].join("");
    };
    renderMap = megaMap.join('<br>');
    renderKaart(renderMap);
    console.log(megaMap);
};

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
    //stuur info naar HTML document output
    var outputElement = document.getElementById("renderContainer");
    outputElement.innerHTML = `${kaart}`;
};