let resultsList = [];
let resultsList2 = [];
const tekst = "som van mogelijke sommen";
const tekst2 = "";

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

function dec2bin(dec) { //https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
    return (dec >>> 0).toString(2);
  }

  function vindSommen(antwoord, getallen) { 
    let somVanMogelijkeOplossingen = 0;
    let aantalOperators = (getallen.length-1)*(getallen.length-1)
    console.log(`aantalOperators: ${aantalOperators}`);

    for (let index = 0; index <= aantalOperators; index++) {
        
        let resultaat = getallen[0];
        //het aantal mogelijkheden is lengte kwadraat
        //Door het de huidige index in binair om te zetten kunnen we 0 als Plus gebruiken en 1 als Keer en zo alle mogelijkheden doorgaan    
        let binair = dec2bin(index)
        binair = binair.padStart(getallen.length-1,'0');
        binair = binair.split('').reverse().map(Number);
        
        console.log(getallen);
        console.log('binairy:')
        console.log(binair);// dit gaat ergens mis <======= zie rij [81, 40, 27]

        for (let getal = 1; getal < getallen.length; getal++) {
            if(binair[getal-1] === 0) // 0 is plus
                {
                    resultaat += getallen[getal];
                    console.log(`${resultaat} += ${getallen[getal]}`);
                }
            else // 1 is keer 
                {
                    resultaat *= getallen[getal];
                    console.log(`${resultaat} *= ${getallen[getal]}`);
                };
        }
        console.log(`${resultaat} === ${antwoord}: ${resultaat === antwoord}`);
        if(resultaat === antwoord){somVanMogelijkeOplossingen += resultaat};
    }
    return somVanMogelijkeOplossingen;
}

// main loop
function processInputText(inputText) {
    //opdracht 1
    const regels = inputText.split('\n').map(v => v.split(': '))
    console.log(regels);
    let antwoorden = [];
    let sommen = [];
    regels.forEach(element => {
        antwoorden.push(Number(element[0]));
        sommen.push(element[1].split(' ').map(Number)); // TODO split bij spatie en map to number
    });
    console.log(antwoorden);
    console.log(sommen);

    for (let index = 0; index < antwoorden.length; index++) {
        resultsList.push(vindSommen(antwoorden[index], sommen[index]));
    }
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