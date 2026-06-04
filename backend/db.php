<?php

//Connects to the database

$conn = new mysqli(
    "localhost",
    "root",
    "",
    "shopping_list"
);

if ($conn->connect_error) {
    die("Connection failed");
}