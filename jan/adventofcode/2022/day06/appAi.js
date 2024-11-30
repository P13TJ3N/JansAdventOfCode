/*Here are some suggestions for optimizing your code:

Declare variables at the top of your code block to improve readability and avoid hoisting issues.
Use const instead of let for variables that are not reassigned, as it helps prevent accidental reassignment and makes the code easier to understand.
Use template literals instead of concatenation to improve readability and reduce the number of characters needed to write the string.
Use array methods like forEach, map, and filter instead of manually iterating through an array with a for loop. These methods are more concise and easier to read.
Use arrow functions to make your code more concise and easier to read.
Avoid using the console.log function inside of a loop, as it can significantly slow down the performance of your code.
Use the Set object to store unique values instead of using an array with the includes method to check for duplicates.
Here is an example of how your code could look after applying these suggestions:*/

const test0 = "mjqjpqmgbljsphdztnvjfqwrcgsmlb".split(""); // 19
const test1 = "bvwbjplbgvbhsrlpgdmjqwftvncz".split(""); //23
const test2 = "nppdvjthqldpwncqszvftbrmjlhg".split(""); //23
const test3 = "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg".split(""); //29
const test4 = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw".split(""); //26

const fs = require("fs");
const readline = require("readline");
const { fileURLToPath } = require("url");

const rd = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  console: false,
});

let match = false;
let totalScore = 0;

const matchFinder = (word) => {
  const set = new Set();
  for (let i = 0; i < word.length; i++) {
    if (set.has(word[i])) {
      return false;
    }
    set.add(word[i]);
  }
  return true;
};

rd.on("line", (line) => {
  const source = line.split("");
  let last4Letters = source.slice(0, 13);
  for (let i = 0; i < source.length - 14; i++) {
    const iter = i + 13;
    last4Letters = last4Letters.slice(0 - 13);
    last4Letters = last4Letters.concat(source[iter]);
    match = matchFinder(last4Letters);
    if (match) {
      totalScore = iter + 1;
      break;
    }
  }
});

rd.on("close", () => {
  console.log(`match after ${totalScore} characters`);
});