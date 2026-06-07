<?php

//headers to allow requests from different origins, and to stop CORS errors.
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
    "name" => "item_name",
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
                $result = $conn->query("SELECT * FROM item_name");

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


//graphqL mutations to toggle the bought status of an item, and to add a new item to the list.
$mutationType = new ObjectType([
    "name" => "Mutation",
    "fields" => [
        "toggleBought" => [ //togglebought allows the user to mark an item as bought or unbought, and updates the database accordingly.
            "type" => $itemType,
            "args" => [
                "itemID" => Type::nonNull(Type::int()),
                "bought" => Type::nonNull(Type::boolean())
            ],
            "resolve" => function ($root, $args) use ($conn) {
                $itemID = $args["itemID"];
                $bought = $args["bought"] ? true : false;

                $stmt = $conn->prepare(
                    "UPDATE item_name SET bought = ? WHERE itemID = ?"
                );
                $stmt->bind_param("ii", $bought, $itemID);
                if (!$stmt->execute()) {
                    throw new Exception($stmt->error);
                }

                $selectStmt = $conn->prepare(
                    "SELECT itemID, itemName, bought, category FROM item_name WHERE itemID = ?"
                );
                $selectStmt->bind_param("i", $itemID);
                $selectStmt->execute();

                $result = $selectStmt->get_result();
                return $result->fetch_assoc();
            }
        ],

        "addItem" => [ //addItem allows the user to add a new item to the shopping list, and updates the database accordingly.
            "type" => $itemType,
            "args" => [
                "itemName" => Type::nonNull(Type::string()),
                "category" => Type::nonNull(Type::string())
            ],
            "resolve" => function ($root, $args) use ($conn) {
                $itemName = $args["itemName"];
                $category = $args["category"];

                $stmt = $conn->prepare(
                    "INSERT INTO item_name (itemName, bought, category) VALUES (?, false, ?)"
                );
                $stmt->bind_param("ss", $itemName, $category);
                if (!$stmt->execute()) {
                    throw new Exception($stmt->error);
                }

                $itemID = $stmt->insert_id;

                return [
                    "itemID" => $itemID,
                    "itemName" => $itemName,
                    "bought" => false,
                    "category" => $category
                ];
            }
        ]
    ]
]);


//here executes the graphQL task, then returns the result as JSON to the frontend.
$schema = new Schema([
    "query" => $queryType,
    "mutation" => $mutationType
]);

$input = json_decode(file_get_contents("php://input"), true);

$query = $input["query"];
$variables = $input["variables"] ?? null;

$result = GraphQL::executeQuery(
    $schema,
    $query,
    null,
    null,
    $variables
);

echo json_encode($result->toArray(true));