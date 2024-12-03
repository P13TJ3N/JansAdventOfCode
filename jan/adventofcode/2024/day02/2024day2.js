let resultsList = [];
let resultsList2 = [];
const tekst = "Aantal veilige levels";
const tekst2 = "Aantal veilige levels met probleem demper aan";

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

//per lijn
function processInputText(inputText) {
    var lines = inputText.split('\n')

    //opdracht1
    // for (let line = 0; line < lines.length; line++){
    //     let levels = lines[line].split(' ').map(Number)
    //     let omhoog = (levels[0] < levels[1])
        
    //     let levelVerschillen = []
    //     for (let level = 1; level < levels.length; level++){
    //         let difference = levels[level]-levels[level-1];
    //         levelVerschillen.push(difference)
    //     }
    //     let maxHoogte = Math.max(...levelVerschillen);
    //     let maxDiepte = Math.min(...levelVerschillen);
    //     if(omhoog && maxHoogte < 4 && maxDiepte > 0){resultsList.push(0)}
    //     else if (maxHoogte < 0  && maxDiepte > -4){resultsList.push(0)}
    // }

    //opdracht2
    for (let line = 0; line < lines.length; line++){//per rapport
        let levels = lines[line].split(' ').map(Number)
        console.log(`-----rapport: ${line+1} -----`);
    
        let levelVerschillen = []
        for (let level = 1; level < levels.length; level++){
            let difference = levels[level]-levels[level-1];
            levelVerschillen.push(difference)
        };
        let omhoog = (arrSum(levelVerschillen)>0)

        let demperLevels = [];
        let errors = [];
        let newErrors = [];
        let dempers = 0;
        console.log(levels);
        for (let level = 1; level < levels.length; level++){//per level
            let difference = levels[level]-levels[level-1];
            let errorFound = false;

            if(omhoog){
                if(!([1,2,3].includes(difference))){errors.push(1); errorFound = true;};
            }else if(!([-1,-2,-3].includes(difference))){errors.push(1); errorFound = true;};

            if(level > 1 && errorFound && dempers === 0 ){//remove elemnt from index and save to new array
                dempers = 1; 
                copy =[...levels] ; 
                let verwijderde_getal = copy.splice(level-1, 1);
                console.log(`we verwijderen ${verwijderde_getal} van ${levels}`);
                demperLevels.push(...copy);
            };
            if(!(errorFound)){errors.push(0);};
        };

        if(dempers ===1 ){
            let demperDifferenceLijst = []
            console.log(`demper calculatie start`);
            console.log(demperLevels);
            for (let level = 1; level < demperLevels.length; level++){//per leveldemper, vind errors 
                let demperDifference = demperLevels[level]-demperLevels[level-1];
                console.log(`we vergelijken nu ${demperLevels[level]} met ${demperLevels[level-1]} een  ${demperDifference} verschil`);
                demperDifferenceLijst.push(demperDifference);
                let errorFound = false;
                if(omhoog){
                    if(!([1,2,3].includes(demperDifference))){newErrors.push(1); errorFound = true;};
                }else if(!([-1,-2,-3].includes(demperDifference))){newErrors.push(1); errorFound = true;};
                if(!(errorFound)){newErrors.push(0)};
            };
            console.log(demperDifferenceLijst);
            console.log(newErrors);
        };
        // geprobeerde oplossingen: 259, 238, 234, 263, 239
        // vogel deze uit: 73 75 77 80 81 78 81 82
        if(arrSum(errors) === 0 ){resultsList.push(1); resultsList2.push(1);console.log(`geen error gevonden`)}
        if(dempers === 1 && arrSum(newErrors) === 0 ){resultsList2.push(1)}
    }

    //RENDER RESULT
    let kaart = ':D'
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