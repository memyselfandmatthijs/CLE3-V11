<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "v11_project";

$db = mysqli_connect($host, $user, $password, $database)
or die("Error:".mysqli_connect_error());
