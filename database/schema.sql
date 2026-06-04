CREATE TABLE item_name(
    itemID int AUTO_INCREMENT PRIMARY KEY,
    itemName varchar(255) NOT NULL,
    bought boolean DEFAULT FALSE,
    category varchar(255) NOT NULL
);