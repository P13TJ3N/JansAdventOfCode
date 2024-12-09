<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo basename(dirname(__FILE__)) ?></title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
            color: #333;
        }

        h2 {
            color: #4a4a78;
            margin-bottom: 10px;
        }

        .container {
            padding: 20px;
        }

        #inputContainer,
        #outputContainer,
        #renderContainer {
            margin-bottom: 30px;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }

        textarea {
            width: 100%;
            height: 150px;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 10px;
            font-size: 16px;
            resize: vertical;
        }

        textarea:focus {
            border-color: #4a4a78;
            outline: none;
        }

        button {
            background-color: #4a4a78;
            color: #fff;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 4px;
            cursor: pointer;
        }

        button:hover {
            background-color: #6363a6;
        }

        @media (max-width: 768px) {
            textarea {
                height: 120px;
            }

            button {
                width: 100%;
                margin-top: 10px;
            }
        }
    </style>
</head>
<body>
    <div id="inputContainer">
        <h2>Input</h2>
        <textarea id="inputTextArea" rows="5"></textarea>
        <button onclick="calculateResult()">Engage!</button>
    </div>

    <div id="outputText">
        <h2>Output</h2>
        <textarea id="outputTextArea" readonly></textarea>
    </div>

    <div id="renderContainer">
        <h2>Render</h2>
        <textarea id="renderTextArea" readonly></textarea>
    </div>

    <script src="2024day5.js"></script>
</body>
</html>