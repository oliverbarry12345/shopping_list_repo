<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require "vendor/autoload.php";
require "db.php";

use GraphQL\GraphQL;
use GraphQL\Type\Schema;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

//graphQL type for the shopping list items

$itemType = new ObjectType([
    "name" => "ShoppingListItem",
    "fields" => [
        "itemID" => Type::int(),
        "itemName" => Type::string(),
        "bought" => Type::boolean(),
        "category" => Type::string()
    ]
]);

//graphQL query to retrieve all items from the DB

$queryType = new ObjectType([
    "name" => "Query",
    "fields" => [
        "items" => [
            "type" => Type::listOf($itemType),
            "resolve" => function () use ($conn) {
                $result = $conn->query("SELECT * FROM item_name");//item_name caused a fun error!

                if (!$result) {
                    throw new Exception(
                        $conn->error
                    );
                }

                $items = [];

                while ($row = $result->fetch_assoc()) {
                    $items[] = $row;
                }

                return $items;
            }
        ]
    ]
]);

$schema = new Schema([
    "query" => $queryType 
]);

$input = json_decode(
    file_get_contents("php://input"),
    true
);

$query = $input["query"];

$result = GraphQL::executeQuery(
    $schema,
    $query
);

$output = $result->toArray(true);//the fix to my annoying error. (true)
echo json_encode($result->toArray(true));

