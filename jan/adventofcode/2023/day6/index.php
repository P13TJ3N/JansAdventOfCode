<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>This one really grinds my gears</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        #inputContainer {
            background-color: #fff;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 80%; /* Set width to 80% */
            box-sizing: border-box;
        }

        h2 {
            color: #333;
        }

        button {
            background-color: #4caf50;
            color: #fff;
            padding: 10px;
            border: none;
            cursor: pointer;
        }

        button:hover {
            background-color: #45a049;
        }

        textarea {
            width: 100%;
            margin-top: 10px;
            padding: 10px;
            box-sizing: border-box;
        }

        #outputText {
            margin-top: 10px;
            color: #333;
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

    <div>
        <h2>Output</h2>
        <p id="outputText"></p>
    </div>

    <script src="2023day6.js"></script>
</body>
</html>