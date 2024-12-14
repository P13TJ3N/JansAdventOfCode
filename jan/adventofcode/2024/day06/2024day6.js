// I heavilly copied code from here: https://gist.github.com/straker/ff00b4b49669ad3dec890306d348adc4
// thanks https://gist.github.com/straker, I never animated javascript/html before and this really helped me understand it better.

let resultsList = [];
let resultsList2 = [];
const tekst = "steppen tot de bewaker weg is";
const tekst2 = "Mogenlijk nieuwe obstakelpunten";

function calculateResult() {
    var inputElement = document.getElementById("inputTextArea");// haal Input waarden op
    var inputText = inputElement.value;
    processInputText(inputText);// verwerk input waarden
}

//functions
function arrSum(arr) { 
    return arr.reduce(function(a, b) {
        return a + b;
    }, 0);
}
// get random whole numbers in a specific range
// @see https://stackoverflow.com/a/1527820/2124254
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
    }

//https://stackoverflow.com/questions/20339466/how-to-remove-duplicates-from-a-two-dimensional-array
function removeDuplicates(arr) {
    var uniques = [];
    var itemsFound = {};
    for(var i = 0, l = arr.length; i < l; i++) {
        var stringified = JSON.stringify(arr[i]);
        if(itemsFound[stringified]) { continue; }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
}


// main loop
function processInputText(inputText) {
    //opdracht 1
    let kaart = inputText.split('\n').map(function(x){return x.split("")});
    var grid = 10;
    var count = 0;
    let running = true;

    var canvas = document.getElementById('game');
    var context = canvas.getContext('2d');
    canvas.width = (kaart.length)*grid;
    canvas.height = (kaart[0].length)*grid;

    // the canvas width & height, guard x & y, and the obstacle x & y, all need to be a multiples of the grid size in order for collision detection to work
    var guard = {
    x: grid,
    y: grid,
    next_x: grid,
    next_y: grid,

    // guard velocity. moves one grid length every frame in either the x or y direction
    dx: 0,
    dy: -grid,
    richting: 'up',

    // keep track of all grids the guard body occupies
    cells: [],

    // length of the guard. grows when eating an obstacle
    maxCells: 1
    };

    let obstacles = [];

    //find guards and obstacles
    for (rij = 0; rij < kaart.length; rij++) {
        for (kol = 0; kol < kaart.length; kol++) {
            let cel = kaart[rij][kol];
            if(cel === '^'){guard.y = rij*grid; guard.x = kol*grid;};
            if(cel === '#'){obstacles.push([rij*grid,kol*grid])};
        };
    };
    console.log(obstacles);

    ////////////////// game loop ///////////////////
    function loop() {
    if(running){requestAnimationFrame(loop)};

    // slow game loop to 15 fps instead of 60 (60/15 = 4)
    if (++count < 0.001) {
        return;
    }

    count = 0;
    context.clearRect(0,0,canvas.width,canvas.height);

    // move guard by it's velocity
    guard.x += guard.dx;
    guard.y += guard.dy;
    guard.next_x = (guard.x + guard.dx);
    guard.next_y = (guard.y + guard.dy);

    // wrap guard position vertically on edge of screen
    if (guard.y < 0 || guard.y >= canvas.height) {
        console.log('thats all folks');
        running = false;
        let opdracht1Score  = removeDuplicates(guard.cells);
        resultsList = [opdracht1Score.length];
        displayResults();
    }

    // keep track of where guard has been.
    guard.cells.unshift({x: guard.x, y: guard.y})

    //draw path
    context.fillStyle = 'grey';
    guard.cells.forEach(function(cell, index) {
     // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
        context.fillRect(cell.x, cell.y, grid-1, grid-1);
    })
    // draw obstacle
    context.fillStyle = 'red';
    obstacles.forEach(function(item, index) {
        context.fillRect(item[1], item[0], grid-1, grid-1);
    })
    // draw guard
    context.fillStyle = 'green';
    context.fillRect(guard.x, guard.y, grid-1, grid-1);

    context.fillStyle = 'blue';
    context.fillRect(guard.next_x, guard.next_y, grid-1, grid-1);
    //console.log(`${guard.next_x} ${guard.next_y} ${guard.x} ${guard.y}`);

    //check if guard hits obstacle
    for (rij = 0; rij < obstacles.length; rij++) { 
        if(obstacles[rij][0] === guard.next_y && obstacles[rij][1] === guard.next_x){
                 if(guard.richting === 'up')    { guard.dx = grid;  guard.dy = 0; guard.richting = 'right'}
            else if(guard.richting === 'down')  { guard.dx = -grid; guard.dy = 0; guard.richting = 'left'}
            else if(guard.richting === 'left')  { guard.dy = -grid; guard.dx = 0; guard.richting = 'up'}
            else if(guard.richting === 'right') { guard.dy = grid;  guard.dx = 0; guard.richting = 'down'};
        };
    };

    }// end game loop

    // start the game
    if(running){requestAnimationFrame(loop)};
}

function displayResults() {
    let resultsListSum = arrSum(resultsList);console.log(`${tekst} : ${resultsListSum}`);
    let resultsListSum2 = arrSum(resultsList2);console.log(`${tekst2} : ${resultsListSum2}`);
    
    //stuur info naar HTML document output
    var outputElement = document.getElementById("outputTextArea");
    outputElement.value = `${tekst} : ${resultsListSum} \n${tekst2}: ${resultsListSum2}`;
};