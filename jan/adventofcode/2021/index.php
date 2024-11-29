<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>List Folders</title>
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

        button {
            background-color: #4caf50;
            color: #fff;
            padding: 10px;
            margin: 5px;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            text-decoration: none;
            display: inline-block;
        }

        button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>

<?php
$directory = '.'; // Set the directory path (current directory in this case)
$folders = array_diff(scandir($directory), ['.', '..']);

foreach ($folders as $folder) {
    if (is_dir($folder)) {
        echo "<a href='$folder/'><button>$folder</button></a>";
    }
}
?>

</body>
</html>
