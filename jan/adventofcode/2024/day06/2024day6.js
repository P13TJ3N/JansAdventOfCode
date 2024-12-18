// I heavilly copied code from here: https://gist.github.com/straker/ff00b4b49669ad3dec890306d348adc4
// thanks https://gist.github.com/straker, I never animated javascript/html before and this really helped me understand it better.

let resultsList = [];
let resultsList2 = [];
let actieve_bewakers = 0;
let opdracht1 = [];
let opdracht2 = [];
const tekst = "stappen tot de bewaker weg is";
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

function isArrayInArray(arr, item){ //https://stackoverflow.com/questions/41661287/how-to-check-if-an-array-contains-another-array
    var item_as_string = JSON.stringify(item);
  
    var contains = arr.some(function(ele){
      return JSON.stringify(ele) === item_as_string;
    });
    return contains;
  }
  

// main loop
function processInputText(inputText) {
    //opdracht 1
    let kaart = inputText.split('\n').map(function(x){return x.split("")});
    var grid = 1;
    var rendersize = 10
    var count = 0;
    let running = true;
    let shadow_guards = [];
    let confirmed_shadow_obstacles = [];

    var canvas = document.getElementById('game');
    var context = canvas.getContext('2d');
    canvas.width = (kaart.length)*rendersize;
    canvas.height = (kaart[0].length)*rendersize;

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

    // keep track of all steps the guard has taken
    cells: [],
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

    const guard_start = {...guard};


    ////////////////// game loop ///////////////////
    function loop() {
    requestAnimationFrame(loop)

    // slow game loop to 15 fps instead of 60 (60/15 = 4)
    if (++count < 1) {
        return;
    }
    count = 0;
    context.clearRect(0,0,canvas.width,canvas.height);
    
    if(running){//als opdracht 1 nog loopt
        // move guard by it's velocity
        guard.x += guard.dx;
        guard.y += guard.dy;
        guard.next_x = (guard.x + guard.dx);
        guard.next_y = (guard.y + guard.dy);

        //shadow guard mag niet spawnen als er een obstakel is.

        //TODO
        console.log(guard_start);
            actieve_bewakers++;
            displayResults();
            shadow_guards.push({
                x: guard_start.x,
                y: guard_start.y,
                next_x: guard_start.next_x,
                next_y: guard_start.next_y,
                dx: guard_start.dx,
                dy: guard_start.dy,
                richting: 'up',
                cells: [],
                steps: [],
                active: true,
                looping: false,
                obstacle_x: guard.next_x,  
                obstacle_y: guard.next_y, 
            });

        // keep track of where guard has been.
        guard.cells.unshift({x: guard.x, y: guard.y});
        if(!(opdracht1.includes(`${guard.x}:${guard.y}`))){opdracht1.push(`${guard.x}:${guard.y}`)};

        // guard leaves the screen, game over
        if (guard.y < 0 || guard.y > kaart.length-1 ||guard.x < 0 || guard.x > kaart[0].length-1) {
            running = false;
            resultsList = [opdracht1.length];
            displayResults();
        }

        //check if guard hits obstacle
        if (kaart[guard.next_y]?.[guard.next_x] !== undefined) {
            if (kaart[guard.next_y][guard.next_x] === '#') {
                    if(guard.richting === 'up') { 
                        if (kaart[guard.y]?.[guard.x + 1] !== '#') {
                            guard.dx = grid;
                            guard.dy = 0;
                            guard.richting = 'right';
                        } else {
                            guard.dy = grid;
                            guard.dx = 0;
                            guard.richting = 'down';
                        }
                    }else if(guard.richting === 'down') {
                        if (kaart[guard.y]?.[guard.x - 1] !== '#') {
                            guard.dx = -grid;
                            guard.dy = 0;
                            guard.richting = 'left';
                        } else {
                            guard.dy = -grid;
                            guard.dx = 0;
                            guard.richting = 'up';
                        }
                    }
                    else if(guard.richting === 'left')  {
                        if (kaart[guard.y-1]?.[guard.x] !== '#') {
                            guard.dy = -grid;
                            guard.dx = 0;
                            guard.richting = 'up';
                        } else {
                            guard.dx = grid;
                            guard.dy = 0;
                            guard.richting = 'right';
                        }
                    }
                    else if(guard.richting === 'right') {
                        if (kaart[guard.y+1]?.[guard.x] !== '#') {
                            guard.dy = grid;
                            guard.dx = 0;
                            guard.richting = 'down';
                        } else {
                            guard.dx = -grid;
                            guard.dy = 0;
                            guard.richting = 'left';
                        }
                    };
                };
            };
        };

    //release the shadowguards!
    shadow_guards.forEach(function(shadowguard, index) {
        if(shadowguard.active){

            // move shadow guard by it's velocity
            shadowguard.x += shadowguard.dx;
            shadowguard.y += shadowguard.dy;
            shadowguard.next_x = (shadowguard.x + shadowguard.dx);
            shadowguard.next_y = (shadowguard.y + shadowguard.dy);

            // shadow guard leaves the screen, game over
            if (shadowguard.y < 0 || shadowguard.y > kaart.length-1 ||shadowguard.x < 0 || shadowguard.x > kaart[0].length-1) 
                { shadowguard.active = false; actieve_bewakers--; displayResults();};
            
            // track step and detect loop
            if(!(shadowguard.looping)){
            if(shadowguard.steps.includes(`${shadowguard.x}:${shadowguard.y}:${shadowguard.richting}`)){
                shadowguard.looping = true;
                actieve_bewakers--;
                if(!(isArrayInArray(confirmed_shadow_obstacles,[shadowguard.obstacle_y,shadowguard.obstacle_x]))){
                    resultsList2.push(1);
                    displayResults();
                    confirmed_shadow_obstacles.push([shadowguard.obstacle_y,shadowguard.obstacle_x]);
                    confirmed_shadow_obstacles.sort();
                };
            }else { shadowguard.steps.push(`${shadowguard.x}:${shadowguard.y}:${shadowguard.richting}`);};};

            //check if shadow_guards hits obstacle
            if (kaart[shadowguard.next_y]?.[shadowguard.next_x] !== undefined) {
                if (kaart[shadowguard.next_y][shadowguard.next_x] === '#' || (shadowguard.next_y === shadowguard.obstacle_y && shadowguard.next_x === shadowguard.obstacle_x )) {
                        if(shadowguard.richting === 'up') { 
                            if (kaart[shadowguard.y]?.[shadowguard.x + 1] !== '#' || (shadowguard.y === shadowguard.obstacle_y && shadowguard.x + 1 === shadowguard.obstacle_x )) {
                                shadowguard.dx = grid;
                                shadowguard.dy = 0;
                                shadowguard.richting = 'right';
                            } else {
                                shadowguard.dy = grid;
                                shadowguard.dx = 0;
                                shadowguard.richting = 'down';
                            }
                        }else if(shadowguard.richting === 'down') {
                            if (kaart[shadowguard.y]?.[shadowguard.x - 1] !== '#' || (shadowguard.y === shadowguard.obstacle_y && shadowguard.x - 1 === shadowguard.obstacle_x )) {
                                shadowguard.dx = -grid;
                                shadowguard.dy = 0;
                                shadowguard.richting = 'left';
                            } else {
                                shadowguard.dy = -grid;
                                shadowguard.dx = 0;
                                shadowguard.richting = 'up';
                            }
                        }
                        else if(shadowguard.richting === 'left')  {
                            if (kaart[shadowguard.y-1]?.[shadowguard.x] !== '#' || (shadowguard.y - 1 === shadowguard.obstacle_y && shadowguard.x === shadowguard.obstacle_x )) {
                                shadowguard.dy = -grid;
                                shadowguard.dx = 0;
                                shadowguard.richting = 'up';
                            } else {
                                shadowguard.dx = grid;
                                shadowguard.dy = 0;
                                shadowguard.richting = 'right';
                            }
                        }
                        else if(shadowguard.richting === 'right') {
                            if (kaart[shadowguard.y+1]?.[shadowguard.x] !== '#'|| (shadowguard.y + 1 === shadowguard.obstacle_y && shadowguard.x === shadowguard.obstacle_x )) {
                                shadowguard.dy = grid;
                                shadowguard.dx = 0;
                                shadowguard.richting = 'down';
                            } else {
                                shadowguard.dx = -grid;
                                shadowguard.dy = 0;
                                shadowguard.richting = 'left';
                            }
                        };
                    };
                };}})



    //draw path
    context.fillStyle = 'teal';
    guard.cells.forEach(function(cell, index) {
     // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
        context.fillRect(cell.x*rendersize, cell.y*rendersize, rendersize-1, rendersize-1);
    })
    // draw obstacle
    context.fillStyle = 'red';
    obstacles.forEach(function(item, index) {
        context.fillRect(item[1]*rendersize, item[0]*rendersize, rendersize-1, rendersize-1);
    })
    // draw shadow guard obstacles
    if(confirmed_shadow_obstacles){
    context.fillStyle = 'yellow';
    confirmed_shadow_obstacles.forEach(function(confirmed_shadow_obstacle, index) {
        context.fillRect(confirmed_shadow_obstacle[1]*rendersize, confirmed_shadow_obstacle[0]*rendersize, rendersize-1, rendersize-1);
    })}

    // draw guard
    context.fillStyle = 'green';
    context.fillRect(guard.x*rendersize, guard.y*rendersize, rendersize-1, rendersize-1);

    context.fillStyle = 'blue';
    context.fillRect(guard.next_x*rendersize, guard.next_y*rendersize, rendersize-1, rendersize-1);
    //console.log(`${guard.next_x} ${guard.next_y} ${guard.x} ${guard.y}`);


    // draw shadow guards
    context.fillStyle = 'purple';
    shadow_guards.forEach(function(shadowguard, index) {
        context.fillRect(shadowguard.x*rendersize, shadowguard.y*rendersize, rendersize-1, rendersize-1);
    })


    }// end game loop

    // start the game
    requestAnimationFrame(loop)
}

function displayResults() {
    let resultsListSum = arrSum(resultsList);console.log(`${tekst} : ${resultsListSum}`);
    let resultsListSum2 = arrSum(resultsList2);console.log(`${tekst2} : ${resultsListSum2}`);
    
    //stuur info naar HTML document output
    var outputElement = document.getElementById("outputTextArea");
    outputElement.value = `${tekst} : ${resultsListSum} \n${tekst2}: ${resultsListSum2} \nAantal actieve bewakers: ${actieve_bewakers}`;
};

//1710 te hoog
//1633/1634 te laag