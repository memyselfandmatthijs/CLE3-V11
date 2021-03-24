<?php
if (isset($_POST['upperButton'])){
    $_POST = "";
    header('location: upper/index.html');
}
if (isset($_POST["middleButton"])){
    $_POST = "";
    header('location: middle/deck.html');
}
if (isset($_POST['lowerButton'])){
    $_POST = "";
    header('location: bottom/blackjack.html');
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../main-page/css/style.css">
    <title>Explore</title>
</head>
<body>
<h1>Choose a deck</h1>

<form method="post" action="index.php">
    <button class="exploreUpperButton" name="upperButton" id="upperButton" type="submit">
        <h3>Upper</h3>
        <p>Beerpong</p>
    </button>
    <br>
    <br>
    <button name="middleButton" id="middleButton" type="submit">
        <h3>Middle</h3>
        <p>Beerpong</p>
    </button>
    <br>
    <br>
    <button name="lowerButton" id="lowerButton" type="submit">
        <h3>Lower</h3>
        <p>Beerpong</p>
    </button>
</form>



</body>
</html>