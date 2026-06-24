<?php

function deleteItem(mysqli $conn, array $args): bool {
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


function clearBoughtItems(mysqli $conn):bool {
    $stmt = $conn->prepare(
        "DELETE FROM item_name WHERE bought = true"
    );

    if (!$stmt->execute()) {
        throw new Exception($stmt->error);
    }

    return true;
}

//all of the following functions have the exact same block of code to fetch the relevant item. 
//to stop using repetetive code, this function getItembyID replaces the repetetive code. 

function getItemByID(mysqli $conn, int $itemID): array {
    $stmt = $conn->prepare("
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

    $stmt->bind_param("i", $itemID);
    $stmt->execute();

    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    if (!$row) {
        throw new Exception("Item not found");
    }

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


function toggleBought(mysqli $conn, array $args): array{
    $itemID = $args["itemID"];
    $bought = $args["bought"] ? 1 : 0;

    $stmt = $conn->prepare(
        "UPDATE item_name SET bought = ? WHERE itemID = ?"
    );
    $stmt->bind_param("ii", $bought, $itemID);
    if (!$stmt->execute()) {
        throw new Exception($stmt->error);
    }
        
    return getItemByID($conn, $itemID);
}


function addItem(mysqli $conn, array $args) : array{
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

    return getItemByID($conn, $itemID);
}


function updateItem(mysqli $conn, array $args) : array{
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

    return getItemByID($conn, $itemID);
}


function addItemsFromFile(mysqli $conn, array $args): array
{
    $insertStmt = $conn->prepare(
        "INSERT INTO item_name (itemName, bought, categoryID) VALUES (?, false, ?)"
    );

    if (!$insertStmt) {
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

        $createdItems[] = getItemByID($conn, $itemID);
    }

    return $createdItems;
}