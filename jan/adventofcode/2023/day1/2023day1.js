let calibrationNumberList = [];
let calibrationNumberWordList = [];

function calculateResult() {
    // haal Input waarden op
    var inputElement = document.getElementById("inputTextArea");
    var inputText = inputElement.value;
    // verwerk input waarden
    processInputText(inputText);
    // geef resultaat terug aan webpagina en console.log
    displayResults();
}

function arrSum(arr) { //function to sum an array
    return arr.reduce(function(a, b) {
        return a + b;
    }, 0);
}

function reverseString(str) {
    var newString = "";
    for (var i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;
}

function processInputText(inputText) {
    var lines = inputText.split('\n');

    lines.forEach(function(line) {
        line = line.replace(/\D/g,''); //hou alleen getallen over
        let number = line.charAt(0); //pak eerste getal
        let reversedLine = reverseString(line) //
        number = number + reversedLine.charAt(0);
        calibrationNumberList.push(parseInt(number));
    });

    var inputWithWords = inputText;
    inputWithWords = inputWithWords.replace(/one/g,"o1ne");
    inputWithWords = inputWithWords.replace(/two/g,"t2wo");
    inputWithWords = inputWithWords.replace(/three/g,"t3hree");
    inputWithWords = inputWithWords.replace(/four/g,"f4our");
    inputWithWords = inputWithWords.replace(/five/g,"f5ive");
    inputWithWords = inputWithWords.replace(/six/g,"s6ix");
    inputWithWords = inputWithWords.replace(/seven/g,"s7even");
    inputWithWords = inputWithWords.replace(/eight/g,"e8ight");
    inputWithWords = inputWithWords.replace(/nine/g,"n9ine");
    console.log(inputWithWords);
    linesWithWords = inputWithWords.split('\n');

    linesWithWords.forEach(function(wordLine) {
        wordLine = wordLine.replace(/\D/g,''); //hou alleen getallen over
        let number = wordLine.charAt(0); //pak eerste getal
        let reversedLine = reverseString(wordLine) //
        number = number + reversedLine.charAt(0);
        calibrationNumberWordList.push(parseInt(number));
    });

}

function displayResults() {
    let calibrationNumberSum = arrSum(calibrationNumberList);
    let calibrationNumberWordSum = arrSum(calibrationNumberWordList);
    console.log(`The sum of calibration numbers is:${calibrationNumberSum} \n made fromt his list of trebuchet calibration numbers are: ${calibrationNumberList}`);
    console.log(`The sum of calibration numbers is:${calibrationNumberWordSum} \n made fromt his list of trebuchet calibration numbers are: ${calibrationNumberWordList}`);
    // Display results in the output field
    var outputElement = document.getElementById("outputText");
    outputElement.textContent = `De som van de calibratie is:${calibrationNumberSum} \n Maar alsje de uitgeschreven getallen meeneemt dan is het ${calibrationNumberWordSum}`;
}