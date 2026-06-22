<?php

//simply connects to the database

$conn = new mysqli(
    $_ENV["DB_HOST"],
    $_ENV["DB_USER"],
    $_ENV["DB_PASS"],
    $_ENV["DB_NAME"]
);

if ($conn->connect_error) {
    die("Connection failed");
}