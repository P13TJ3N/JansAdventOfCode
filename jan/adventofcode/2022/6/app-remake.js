const test0 = "mjqjpqmgbljsphdztnvjfqwrcgsmlb".split("") // 19
const test1 = "bvwbjplbgvbhsrlpgdmjqwftvncz".split(""); //23
const test2 = "nppdvjthqldpwncqszvftbrmjlhg".split(""); //23
const test3= "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg".split(""); //29
const test4= "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw".split(""); //26
const letters = 14;
const offset = letters-1;
let match = false;
let totalScore = 0;

//imports
const fs = require("fs");
const readline = require("readline");
const { fileURLToPath } = require("url");

const rd = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  console: false
});

function matchFinder(word){
  let set = new Set();
  for(let i = 0; i < word.length; i++){
    if(set.has(word[i])){// finds fuplicates
      return false;
    }
     set.add(word[i]);
  }
  return true;
}

//do something each line
rd.on("line", line => {
  const source = line;
  let letterSelect = source.slice(0,offset);
  console.log(letterSelect);
  for (let i = 0; i < source.length-letters; i++)
  {
    let iter = i+offset;
    console.log(`now checking position ${iter}, adding letter ${source[iter]}`)
    letterSelect = letterSelect.slice(0-offset); //keep latest 3 letters
    letterSelect = letterSelect.concat(source[iter]); //add new letter
    console.log(letterSelect);
    match = matchFinder(letterSelect);
    if(match){totalScore = iter+1; break;};
  };
});

//do something on close
rd.on("close", () => {
    console.log(`match after ${totalScore} characters`);
});