CREATE TABLE item_name (
    itemID INT AUTO_INCREMENT PRIMARY KEY,
    itemName VARCHAR(255) NOT NULL,
    bought BOOLEAN DEFAULT FALSE,
    categoryID INT,
    CONSTRAINT fk_item_category
        FOREIGN KEY (categoryID)
        REFERENCES categories(categoryID)
);

CREATE TABLE categories (
    categoryID INT AUTO_INCREMENT PRIMARY KEY,
    categoryName VARCHAR(255) NOT NULL UNIQUE
);