const test0 = "mjqjpqmgbljsphdztnvjfqwrcgsmlb".split("") // 19
const test1 = "bvwbjplbgvbhsrlpgdmjqwftvncz".split(""); //23
const test2 = "nppdvjthqldpwncqszvftbrmjlhg".split(""); //23
const test3= "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg".split(""); //29
const test4= "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw".split(""); //26
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
  let last4Letters = source.slice(0,3);
  console.log(last4Letters);
  for (let i = 0; i < source.length-4; i++)
  {
    let iter = i+3;
    console.log(`now checking position ${iter}, adding letter ${source[iter]}`)
    last4Letters = last4Letters.slice(0-3); //keep latest 3 letters
    last4Letters = last4Letters.concat(source[iter]); //add new letter
    console.log(last4Letters);
    match = matchFinder(last4Letters);
    if(match){totalScore = iter+1; break;};
  };
});

//do something on close
rd.on("close", () => {
    console.log(`match after ${totalScore} characters`);
});
