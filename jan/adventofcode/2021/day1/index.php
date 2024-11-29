<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Page Title</title>
    <style>
        body {
            font-family: 'Courier New', monospace;
            margin: 0;
            padding: 0;
        }

        #inputContainer {
            margin: 20px;
        }

        #outputContainer,
        #renderContainer {
            margin: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        #outputTextArea,
        #renderTextArea {
            width: 80%;
            height: 200px;
            margin-top: 10px;
            overflow-y: auto;
        }
    </style>
</head>
<body>
    <div id="inputContainer">
        <h2>Input</h2>    
        <button onclick="calculateResult()">Engage!</button>
        <br>
        <textarea id="inputTextArea" rows="5"></textarea>
    </div>

    <div id="outputText">
        <h2>Output</h2>
        <textarea id="outputTextArea" readonly></textarea>
    </div>

    <div id="renderContainer">
        <h2>Render</h2>
        <textarea id="renderTextArea" readonly></textarea>
    </div>

    <script src="day1/2021day1.js"></script>
</body>
</html>
