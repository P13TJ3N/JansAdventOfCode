let snakeMap = [];
let scoreMap = [];
let totalScore = 0;

const fs = require("fs");
const readline = require("readline");
const { fileURLToPath } = require("url");
const { runInThisContext } = require("vm");

const rd = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  console: false
})

rd.on("line", line => {
});

rd.on("close", () => {
    console.log(`${totalScore} positions visited`);
});