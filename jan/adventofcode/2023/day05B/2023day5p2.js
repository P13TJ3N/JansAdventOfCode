let resultsList = [];
const tekst = "De kleinste grondlocatie is";
const tekst2 = "";

function calculateResult() {
    // haal Input waarden op
    var inputElement = document.getElementById("inputTextArea");
    var inputText = inputElement.value;
    // verwerk input waarden
    processInputText(inputText);
    // geef resultaat terug aan webpagina en console.log
    displayResults();
};

function arrSum(arr) { 
    return arr.reduce(function(a, b) {
        return a + b;
    }, 0);
};

function sortBySecondColumn(a, b) { //https://stackoverflow.com/questions/16096872/how-to-sort-2-dimensional-array-by-column-value
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}

function mergeIntervals(intervals) { //https://medium.com/@stheodorejohn/mastering-interval-merging-in-javascript-a-simple-and-efficient-guide-3d7080f4a126
    intervals.sort((a, b) => a[0] - b[0]);
    
    const merged = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
      const current = intervals[i];
      const previous = merged[merged.length - 1];
      
      if (current[0] <= previous[1]) {
        previous[1] = Math.max(previous[1], current[1]);
      } else {
        merged.push(current);
      }
    }
    
    return merged;
  };

function processInputText(inputText) {
    var seedMap = inputText.split(/\n\s*\n/); //split als er een lege regel is
    let seeds = seedMap.shift().split(" "); //haal zaad uit eerste eerste lijn 
    let endSeedList = []
    seeds.shift(); //verwijder pre-fix
    console.log(`gevonden zaden: ${seeds}`);
    let seedMapPath = [], debugSeedMapPath =[];
    seedMapPath[0] = [];
    debugSeedMapPath[0] = [];

    //verwerk eerste lijn tot zaden en hun range
    for (let i = 0; i < seeds.length; i+=2) {
        let entry = [parseInt(seeds[i]),(parseInt(seeds[i])+parseInt(seeds[i+1]))];
        seedMapPath[0].push(entry);
    };
    let mapCounter = 0;

    seedMap.forEach(function(map) {
        seedMapPath[mapCounter+1] =[];

        var lines = map.split('\n');
        let currentMap = lines.shift();
        console.log(`processing ${currentMap}`);
        console.log(debugSeedMapPath);
         
        for (let i = 0; i < lines.length; i++) {lines[i] = lines[i].split(" ");}; //Splijt lijn op in DestinationRangeStart-SourceRangeStart-Range
        lines = lines.map(function(x) {return [Number(x[0]), Number(x[1]), Number(x[2])];}); //String naar getallen
        lines.sort(sortBySecondColumn); //Sorteer Map volgens sourceStartRange
        while (seedMapPath[mapCounter].length >0){ //terwijl er nog ranges zijn die niet zijn verwerkt
            console.log(`hoeveelheid zaad bereik: ${seedMapPath[mapCounter].length}`);
            console.log(`${seedMapPath[mapCounter]}`);
            let matchGevonden = false;
            let zaadje = seedMapPath[mapCounter].shift();//pak volgende zaadje van de seedMap voor deze map en verwerk die
            console.log(`we verwerken nu zaadje ${zaadje}`);
            for (let i = 0; i < lines.length; i++) {
                mapItem = lines[i];
                console.log(mapItem);
                let range  = mapItem[2];
                let destinationRangeStart = mapItem[0];
                let sourceRangeStart = mapItem[1];
                let sourceRangeEnd = parseInt(sourceRangeStart+range);
                let afwijking = (destinationRangeStart - sourceRangeStart);
                console.log(`afwijking van ${afwijking} gevonden tussen ${destinationRangeStart} en ${sourceRangeStart}`);

                if(!(zaadje[0] > sourceRangeEnd || zaadje[1] < sourceRangeStart)){console.log(`match gevonden: ${!(zaadje[0] > sourceRangeEnd || zaadje[1] < sourceRangeStart)}: ${zaadje[0]} > ${sourceRangeEnd}:${zaadje[0] > sourceRangeEnd} || ${zaadje[1]} < ${sourceRangeStart}:${zaadje[1] < sourceRangeStart}`)}
                if(!(zaadje[0] > sourceRangeEnd || zaadje[1] < sourceRangeStart)){
                    //check full overlap
                    if(zaadje[0] >= sourceRangeStart && zaadje[1] <= sourceRangeEnd){
                        console.log(`volledige overlap: zaad ${zaadje[0]}-${zaadje[1]} zit volledig in ${sourceRangeStart}-${sourceRangeEnd}`);

                        console.log(`bereik:${zaadje[0]}-${zaadje[1]} word opgeslagen met afwijking als ${zaadje[0]+afwijking}-${zaadje[1]+afwijking}`);
                        let center = [];
                        center.push(zaadje[0]+afwijking);center.push(zaadje[1]+afwijking);
                        seedMapPath[mapCounter+1].push(center);
                        matchGevonden = true;
                        break;

                    //check partial right overlap
                    }else if(zaadje[0] < sourceRangeStart && zaadje[1] <= sourceRangeEnd){
                        console.log(`rechter overlap: zaad ${zaadje[0]}-${zaadje[1]} overlapt rechts met ${sourceRangeStart}-${sourceRangeEnd}`);

                        console.log(`bereik: ${zaadje[0]}-${sourceRangeStart-1} word opgeslagen zonder aanpassing`);
                        let left = [];
                        left.push(zaadje[0]);left.push(sourceRangeStart-1);     
                        seedMapPath[mapCounter+1].push(left);

                        console.log(`bereik:${sourceRangeStart}-${zaadje[1]} word opgeslagen met afwijking als ${sourceRangeStart+afwijking}-${zaadje[1]+afwijking} `);
                        let center = [];
                        center.push(sourceRangeStart+afwijking);center.push(zaadje[1]+afwijking);
                        seedMapPath[mapCounter+1].push(center);
                        matchGevonden = true;
                        break;
                            
                    //check partial left overlap
                    }else if(zaadje[0] >= sourceRangeStart && zaadje[1] > sourceRangeEnd){
                        console.log(`Linker overlap: zaad ${zaadje[0]}-${zaadje[1]} Overlapt links met ${sourceRangeStart}-${sourceRangeEnd}`);

                        console.log(`bereik:${zaadje[0]+afwijking}-${sourceRangeEnd+afwijking} word opgeslagen met afwijking als ${zaadje[0]}-${sourceRangeEnd}`);
                        let center = [];
                        center.push(zaadje[0]+afwijking);center.push(sourceRangeEnd+afwijking);
                        seedMapPath[mapCounter+1].push(center);

                        console.log(`bereik:${sourceRangeEnd+1}-${zaadje[1]} gaat terug de loep in`);
                        let rechts = [];
                        rechts.push(sourceRangeEnd+1); rechts.push(zaadje[1]);
                        seedMapPath[mapCounter].push(rechts);//overblijfsel terug de loep in
                        matchGevonden = true;
                        break;

                    //check for partial inner overlap
                    }else if(zaadje[0] < sourceRangeStart && zaadje[1] > sourceRangeEnd){
                        console.log(`inner overlap: zaad ${zaadje[0]}-${zaadje[1]} overlapt bereik ${sourceRangeStart}-${sourceRangeEnd} volledig`);

                        console.log(`bereik: ${zaadje[0]}-${sourceRangeStart-1} word opgeslagen zonder aanpassing`);
                        let left = [];
                        left.push(zaadje[0]);left.push(sourceRangeStart-1);     
                        seedMapPath[mapCounter+1].push(left);

                        console.log(`bereik:${sourceRangeStart}-${sourceRangeEnd} word opgeslagen met afwijking als ${sourceRangeStart+afwijking}-${sourceRangeEnd+afwijking}`);
                        let center = [];
                        center.push(sourceRangeStart+afwijking);center.push(sourceRangeEnd+afwijking);                        
                        seedMapPath[mapCounter+1].push(center);

                        console.log(`bereik:${sourceRangeEnd+1}-${zaadje[1]} gaat terug de loep in`);
                        let rechts = [];
                        rechts.push(sourceRangeEnd+1); rechts.push(zaadje[1]);
                        seedMapPath[mapCounter].push(rechts);//overblijfsel terug de loep in
                        matchGevonden = true;
                        break;
                    }else{console.log(`${zaadje} zit niet in bereik ${sourceRangeStart}-${sourceRangeEnd}`);};
            };
        };
        //wat als zaden in geen enkele range passen?
        if(!(matchGevonden)){
            console.log(`geen matches gevonden voor ${zaadje} en gaat verder zonder verandering`);
            seedMapPath[mapCounter+1].push(zaadje);
        };
        };
        mapCounter++; //parse volgende map
        debugSeedMapPath[mapCounter] = seedMapPath[mapCounter];
        seedMapPath[mapCounter] = mergeIntervals(seedMapPath[mapCounter]);


    });
    console.log(`final array`);
    console.log(seedMapPath[mapCounter]);

    smallestSeed = (seedMapPath[mapCounter][0][0]-1); //waarom moet dit -1? wat gaat er mis hier?
    resultsList.push(smallestSeed);
};

function displayResults() {
    let resultsListSum = arrSum(resultsList);
    console.log(`${tekst} : ${resultsListSum}`);
    //stuur info naar HTML document output
    var outputElement = document.getElementById("outputText");
    outputElement.textContent = `${tekst} : ${resultsListSum}`
};