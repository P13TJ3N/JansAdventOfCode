let elfTotalCalList = []; // array with list of sum of calories per elf
let elfAmount = 0;
let elfCalories = 0;

function calculateElfCalories() {
    // Get the input value
    var inputElement = document.getElementById("inputTextArea");
    var inputText = inputElement.value;

    // Process input text
    processInputText(inputText);

    // Display the results in the output field
    displayResults();
}

function processInputText(inputText) {
    var lines = inputText.split('\n');

    lines.forEach(function(line) {
        if (line.trim() === '') { // if line is empty, add currentElf as a new entry to array, reset calories, and add to elf amount counter
            elfTotalCalList.push(elfCalories);
            elfCalories = 0;
            elfAmount = elfAmount + 1;
        } else { // if line has numbers, add to current elf calories
            elfCalories += parseInt(line);
        }
    });
}

function arrSum(arr) {
    return arr.reduce(function(a, b) {
        return a + b;
    }, 0);
}

function displayResults() {
    console.log(`The amount of elves is ${elfAmount}`);
    let sortedList = elfTotalCalList.sort().reverse().slice(0, 3); // sort max to min, only leave top 3
    console.log(`The largest amount of calories is ${sortedList[0]}`);
    const summedList = arrSum(sortedList);
    console.log(`The top 3 of elves together carry ${summedList}`);

    // Display results in the output field
    var outputElement = document.getElementById("outputText");
    outputElement.textContent = `Amount of Elves: ${elfAmount}\nLargest Amount of Calories: ${sortedList[0]}\nTop 3 Elves Together Carry: ${summedList}`;
}