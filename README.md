Shopping List Assessment:

1 - Overview
2 - Features
3 - Technology Stack
4 - Architecture
5 - Database Structure
6 - Installation / Running
7 - Future Improvements

1: Overview

This project was made to fit the requirements set out by the project spec, that is, to fir the role of a "simple web-based shopping list", with CRUD cunftionality. 
The user can add, remove, read and update items that they wish to display on their "shopping list". 

2: Features

-> View items in their list. 
-> Add items to the list.
-> Remove items from the list.
-> Update the status of the item.
-> View which items have been "bought" through the sorting system. 
-> Categorise items. 

3: Technology stack

Frontend
- React
- TypeScript
- Relay
- CSS Styled Components

Backend
- PHP
- GraphQL (webonyx/graphql-php)

Database
- MySQL

Tools
- Git
- GitHub
- XAMPP
- Postman

4: Architecture

React frontend displays and allows for user interaction with data. 
\/
Relay bridges the gap between the GraphQL API and the React frontend. 
\/
GraphQL provides a single API endpoint, routing queries to the correct PHP functions.
\/
PHP then applies logic to the data being manipulated, and contacts the database. 
\/
MySQL stores the data. 

5: Database structure

item_name(
    itemID int AUTO_INCREMENT PRIMARY KEY,
    itemName varchar(255) NOT NULL,
    bought boolean DEFAULT FALSE,
    category varchar(255) NOT NULL
);

6: Installation / how to run

Prerequisites: 
- XAMPP
- NPM

To setup: 
1 - Clone the repo.
2 - Import schema.sql into MySQL to create the database.
3 - In main.tsx, line 10, ensure the HTTP_ENDPOINT is correct.
4 - Run Apache and MySQL.
5 - In the terminal, change to frontend directory "cd frontend".
6 - run the react server with "npm run dev".
7 - Follow the localhost link.  

7: Future improvements. 

- Implement Relay mutations instead of direct `fetch()` mutation requests.
- Add editing for item names and categories, in addition to updating their bought status.
- Add category filtering or search for larger shopping lists.
- Move categories into a separate database table.
