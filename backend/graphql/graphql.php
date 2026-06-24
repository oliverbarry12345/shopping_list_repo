<?php

//headers to allow requests from different origins, and to stop CORS errors.
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../config/bootstrap.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../resolvers/itemResolvers.php';
require_once __DIR__ . '/types.php';
require_once __DIR__ . '/queries.php';
require_once __DIR__ . '/mutations.php';


use GraphQL\GraphQL;
use GraphQL\Type\Schema;

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