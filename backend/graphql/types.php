<?php

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\InputObjectType;

//fileInputType
$fileItemInputType = new InputObjectType([
    "name" => "FileItemInput",
    "fields" => [
        "itemName" => Type::nonNull(Type::string()),
        "categoryID" => Type::nonNull(Type::int())
    ]
]);

//categoryType 
$categoryType = new ObjectType([
    "name" => "Category",
    "fields" => [
        "categoryID" => Type::int(),
        "categoryName" => Type::string()
    ]
]);

//itemType
$itemType = new ObjectType([
    "name" => "item_name",
    "fields" => [
        "itemID" => Type::int(),
        "itemName" => Type::string(),
        "bought" => Type::boolean(),
        "category" => $categoryType
    ]
]);