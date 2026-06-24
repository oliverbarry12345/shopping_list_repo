<?php

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

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