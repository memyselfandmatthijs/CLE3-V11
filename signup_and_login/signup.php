<?php
session_start();

$email = '';
$password = '';

//If our session doesn't exist, redirect & exit script
if (isset($_SESSION['loggedInUser'])) {
    header();
    exit;
}


if (isset($_POST['Signup'])) {

    /** @var mysqli $db */
    require_once ("includes/db.php");

    $email = mysqli_real_escape_string($db, $_POST['email']);
    $password = $_POST['password'];

    $errors = [];

    if ($email == '') {
        $errors['email'] = 'De email mag niet leeg zijn';
    }
    if ($password == '') {
        $errors['password'] = 'Het wachtwoord mag niet leeg zijn';
    }

    if (empty($errors)) {
        $password = password_hash($password, PASSWORD_DEFAULT);

        $query = "INSERT INTO players (email, password) VALUES('$email','$password')";
        $result = mysqli_query($db, $query)
        or die('Error: ' . $query);

        if ($result) {
            header();
            exit;
        } else {
            $errors[] = 'Something went wrong in your database query: ' . mysqli_error($db);
        }

        //Close connection
        mysqli_close($db);
    }
}

?>

<!DOCTYPE html>

<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <title>Login & Signup Form</title>
    <link rel="stylesheet" href="style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<div class="wrapper">
    <div class="title-text">
        <div class="title login">
            Login Form</div>
        <div class="title signup">
            Signup Form</div>
    </div>
    <div class="form-container">
        <div class="slide-controls">
            <input type="radio" name="slide" id="login" checked>
            <input type="radio" name="slide" id="signup">
            <label for="login" class="slide login">Login</label>
            <label for="signup" class="slide signup">Signup</label>
            <div class="slider-tab">
            </div>
        </div>

        <div class="form-inner">
            <form action="" class="login">
                <div class="field">
                    <input type="text" placeholder="Email Address" required>
                </div>
                <div class="field">
                    <input type="password" placeholder="Password" required>
                </div>

                <div class="field btn">
                    <div class="btn-layer">
                    </div>
                    <input type="submit" value="Login">
                </div>
                <div class="signup-link">
                    Not a member? <a href="">Signup now</a></div>
            </form>
            <form action="" class="signup" method="post">
                <div class="field">
                    <input name="email" id="email" type="text" placeholder="Email Address" required  value="<?=$email?>">
                </div>
                <div class="field">
                    <input name="password" id="password" type="password" placeholder="password" required >
                </div>
                <div class="field btn">
                    <div class="btn-layer">
                    </div>
                    <input type="submit" placeholder="submit" value="Signup">
                </div>
            </form>
        </div>
    </div>
</div>

<script src="animation.js"></script>

</body>
</html>
