<!DOCTYPE html>
<html>
<head>
  <title><?php echo basename(dirname(__FILE__)) ?></title>
  <meta charset="UTF-8">
  <style>
  html, body {
    height: 100%;
    margin: 0;
  }
  body {
    background: black;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  canvas {
    border: 1px solid white;
  }
  </style>
</head>
<div class="outer">
  <div id="inputContainer">
          <h2>Input</h2>
          <textarea id="inputTextArea" rows="5"></textarea>
          <button onclick="calculateResult()">Engage!</button>
      </div>
      <div id="outputText">
          <h2>Output</h2>
          <textarea id="outputTextArea" readonly></textarea>
      </div>
    </div>
<body>
<canvas width="130" height="130" id="game"></canvas>
<script src="2024day6.js"></script>
</body>
</html>