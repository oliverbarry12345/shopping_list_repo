<?php

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

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
            "resolve" => fn($root, $args) => toggleBought($conn, $args)
        ],

        "addItem" => [ //addItem allows the user to add a new item to the shopping list, and updates the database accordingly.
            "type" => $itemType,
            "args" => [
                "itemName" => Type::nonNull(Type::string()),
                "categoryID" => Type::nonNull(Type::int())
            ],
            "resolve" => fn($root, $args) => addItem($conn, $args)
        ],

        "deleteItem" => [ //deleteItem allows the user to remove an item from the shopping list, and updates the database accordingly.
            "type" => Type::boolean(),
            "args" => [
                "itemID" => Type::nonNull(Type::int())
            ],
            "resolve" => fn($root, $args) => deleteItem($conn, $args)
        ],

        "updateItem" => [ // updateItem allows existing items to be edited. 
            "type" => $itemType,
            "args" => [
                "itemID" => Type::nonNull(Type::int()),
                "itemName" => Type::nonNull(Type::string()),
                "categoryID" => Type::nonNull(Type::int())
            ],
            "resolve" => fn($root, $args) => updateItem($conn, $args)
        ],

        "clearBoughtItems" => [
            "type" => Type::boolean(),
            "resolve" => fn() => clearBoughtItems($conn) 
        ],

        "addItemsFromFile" => [
            "type" => Type::listOf($itemType),
            "args" => [
                "items" => Type::nonNull(Type::listOf(Type::nonNull($fileItemInputType)))
            ],
            "resolve" => fn($root, $args) => addItemsFromFile($conn, $args)
        ],
    ]
]);