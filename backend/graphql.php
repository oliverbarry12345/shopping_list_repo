<?php

require_once __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

require_once 'db.php';

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

use GraphQL\GraphQL;
use GraphQL\Type\Schema;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\InputObjectType;

//graphQL type for the shopping list items

$categoryType = new ObjectType([
    "name" => "Category",
    "fields" => [
        "categoryID" => Type::int(),
        "categoryName" => Type::string()
    ]
]);

$itemType = new ObjectType([
    "name" => "item_name",
    "fields" => [
        "itemID" => Type::int(),
        "itemName" => Type::string(),
        "bought" => Type::boolean(),
        "category" => $categoryType
    ]
]);

//graphQL query to retrieve all items from the DB

$queryType = new ObjectType([ 
    "name" => "Query",
    "fields" => [
        "items" => [
            "type" => Type::listOf($itemType),
            "resolve" => function () use ($conn) { // SQL to select all items, using LEFT JOIN to also select the categoryID.
                $result = $conn->query("
                    SELECT 
                        item_name.itemID,
                        item_name.itemName,
                        item_name.bought,
                        categories.categoryID,
                        categories.categoryName
                    FROM item_name
                    LEFT JOIN categories 
                        ON item_name.categoryID = categories.categoryID
                ");

                if (!$result) {
                    throw new Exception($conn->error);
                }

                $items = [];

                while ($row = $result->fetch_assoc()) {
                    $items[] = [
                        "itemID" => $row["itemID"],
                        "itemName" => $row["itemName"],
                        "bought" => (bool)$row["bought"],
                        "category" => [
                            "categoryID" => $row["categoryID"],
                            "categoryName" => $row["categoryName"]
                        ]
                    ];
                }

                return $items;
            }
        ],
        
        "categories" => [
            "type" => Type::listOf($categoryType),
            "resolve" => function () use ($conn) {
                $result = $conn->query("
                    SELECT categoryID, categoryName
                    FROM categories
                    ORDER BY categoryName
                ");

                if (!$result) {
                    throw new Exception($conn->error);
                }

                $categories = [];

                while ($row = $result->fetch_assoc()) {
                    $categories[] = [
                        "categoryID" => $row["categoryID"],
                        "categoryName" => $row["categoryName"]
                    ];
                }

                return $categories;
            }
        ]
    ]
]);


//fileInputType
$fileItemInputType = new InputObjectType([
    "name" => "FileItemInput",
    "fields" => [
        "itemName" => Type::nonNull(Type::string()),
        "categoryID" => Type::nonNull(Type::int())
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
                    
                $selectStmt = $conn->prepare("
                    SELECT 
                        item_name.itemID,
                        item_name.itemName,
                        item_name.bought,
                        categories.categoryID,
                        categories.categoryName
                    FROM item_name
                    LEFT JOIN categories
                        ON item_name.categoryID = categories.categoryID
                    WHERE item_name.itemID = ?
                ");
                $selectStmt->bind_param("i", $itemID);
                $selectStmt->execute();

                $result = $selectStmt->get_result();
                $row = $result->fetch_assoc();

                return [
                    "itemID" => $row["itemID"],
                    "itemName" => $row["itemName"],
                    "bought" => (bool)$row["bought"],
                    "category" => [
                        "categoryID" => $row["categoryID"],
                        "categoryName" => $row["categoryName"]
                    ]
                ];
            }
        ],

        "addItem" => [ //addItem allows the user to add a new item to the shopping list, and updates the database accordingly.
            "type" => $itemType,
            "args" => [
                "itemName" => Type::nonNull(Type::string()),
                "categoryID" => Type::nonNull(Type::int())
            ],
            "resolve" => function ($root, $args) use ($conn) {
                $itemName = $args["itemName"];
                $categoryID = $args["categoryID"];

                $stmt = $conn->prepare(
                    "INSERT INTO item_name (itemName, bought, categoryID) VALUES (?, false, ?)"
                );

                $stmt->bind_param("si", $itemName, $categoryID);

                if (!$stmt->execute()) {
                    throw new Exception($stmt->error);
                }

                $itemID = $stmt->insert_id;

                $selectStmt = $conn->prepare("
                    SELECT 
                        item_name.itemID,
                        item_name.itemName,
                        item_name.bought,
                        categories.categoryID,
                        categories.categoryName
                    FROM item_name
                    LEFT JOIN categories
                        ON item_name.categoryID = categories.categoryID
                    WHERE item_name.itemID = ?
                ");

                $selectStmt->bind_param("i", $itemID);
                $selectStmt->execute();

                $result = $selectStmt->get_result();
                $row = $result->fetch_assoc();

                return [
                    "itemID" => $row["itemID"],
                    "itemName" => $row["itemName"],
                    "bought" => (bool)$row["bought"],
                    "category" => [
                        "categoryID" => $row["categoryID"],
                        "categoryName" => $row["categoryName"]
                    ]
                ];
            }
        ],

        "deleteItem" => [ //deleteItem allows the user to remove an item from the shopping list, and updates the database accordingly.
            "type" => Type::boolean(),
            "args" => [
                "itemID" => Type::nonNull(Type::int())
            ],
            "resolve" => function ($root, $args) use ($conn) {
                $itemID = $args["itemID"];

                $stmt = $conn->prepare(
                    "DELETE FROM item_name WHERE itemID = ?"
                );
                $stmt->bind_param("i", $itemID);
                if (!$stmt->execute()) {
                    throw new Exception($stmt->error);
                }

                return true;
            }
        ],

        "updateItem" => [ // updateItem allows existing items to be edited. 
            "type" => $itemType,
            "args" => [
                "itemID" => Type::nonNull(Type::int()),
                "itemName" => Type::nonNull(Type::string()),
                "categoryID" => Type::nonNull(Type::int())
            ],
            "resolve" => function ($root, $args) use ($conn) {
                $itemID = $args["itemID"];
                $itemName = $args["itemName"];
                $categoryID = $args["categoryID"];

                $stmt = $conn->prepare(
                    "UPDATE item_name SET itemName = ?, categoryID = ? WHERE itemID = ?"
                );

                $stmt->bind_param("sii", $itemName, $categoryID, $itemID);

                if (!$stmt->execute()) {
                    throw new Exception($stmt->error);
                }

                $selectStmt = $conn->prepare("
                    SELECT 
                        item_name.itemID,
                        item_name.itemName,
                        item_name.bought,
                        categories.categoryID,
                        categories.categoryName
                    FROM item_name
                    LEFT JOIN categories
                        ON item_name.categoryID = categories.categoryID
                    WHERE item_name.itemID = ?
                ");

                $selectStmt->bind_param("i", $itemID);
                $selectStmt->execute();

                $result = $selectStmt->get_result();
                $row = $result->fetch_assoc();

                return [
                    "itemID" => $row["itemID"],
                    "itemName" => $row["itemName"],
                    "bought" => (bool)$row["bought"],
                    "category" => [
                        "categoryID" => $row["categoryID"],
                        "categoryName" => $row["categoryName"]
                    ]
                ];
            }
        ],

        "clearBoughtItems" => [
            "type" => Type::boolean(),
            "resolve" => function () use ($conn) {
                $stmt = $conn->prepare(
                    "DELETE FROM item_name WHERE bought = true"
                );

                if (!$stmt->execute()) {
                    throw new Exception($stmt->error);
                }

                return true;
            }
        ],

        "addItemsFromFile" => [
            "type" => Type::listOf($itemType),
            "args" => [
                "items" => Type::nonNull(Type::listOf(Type::nonNull($fileItemInputType)))
            ],
            "resolve" => function ($root, $args) use ($conn) {
                $insertStmt = $conn->prepare(
                    "INSERT INTO item_name (itemName, bought, categoryID) VALUES (?, false, ?)"
                );

                if (!$insertStmt) {
                    throw new Exception($conn->error);
                }

                $selectStmt = $conn->prepare("
                    SELECT 
                        item_name.itemID,
                        item_name.itemName,
                        item_name.bought,
                        categories.categoryID,
                        categories.categoryName
                    FROM item_name
                    LEFT JOIN categories
                        ON item_name.categoryID = categories.categoryID
                    WHERE item_name.itemID = ?
                ");

                if (!$selectStmt) {
                    throw new Exception($conn->error);
                }

                $createdItems = [];

                foreach ($args["items"] as $item) {
                    $itemName = trim($item["itemName"]);
                    $categoryID = $item["categoryID"];

                    if ($itemName === "") {
                        continue;
                    }

                    $insertStmt->bind_param("si", $itemName, $categoryID);

                    if (!$insertStmt->execute()) {
                        throw new Exception($insertStmt->error);
                    }

                    $itemID = $insertStmt->insert_id;

                    $selectStmt->bind_param("i", $itemID);
                    $selectStmt->execute();

                    $result = $selectStmt->get_result();
                    $row = $result->fetch_assoc();

                    $createdItems[] = [
                        "itemID" => $row["itemID"],
                        "itemName" => $row["itemName"],
                        "bought" => (bool)$row["bought"],
                        "category" => [
                            "categoryID" => $row["categoryID"],
                            "categoryName" => $row["categoryName"]
                        ]
                    ];
                }

                return $createdItems;
            }
        ],
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