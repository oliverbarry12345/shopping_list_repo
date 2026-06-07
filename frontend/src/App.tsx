import type { AppQuery } from "./__generated__/AppQuery.graphql";
import { graphql, useLazyLoadQuery } from "react-relay";
import { useEffect, useState } from "react";

/// useLazyLoadQuery used to fetch graphqlfrom the backend. 
export default function App() {
  const data = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery {
        items {
          itemID
          itemName
          bought
          category
        }
      }
    `,
    {}
  );
  
  const [items, setItems] = useState<any[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    setItems([...data.items]);
  }, [data.items]);


  //togglebought function udates the bought status, by sending a mutation request to the backend. 
  const toggleBought = async (itemID: number, bought: boolean) => {
    const response = await fetch("http://localhost/shopping_list/backend/graphql.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `
          mutation ToggleBought($itemID: Int!, $bought: Boolean!) {
            toggleBought(itemID: $itemID, bought: $bought) {
              itemID
              itemName
              bought
              category
            }
          }
        `,
        variables: {
          itemID,
          bought
        }
      })
    });

    const result = await response.json();
    console.log("Toggle result:", result);

    if (result.errors) {
      console.error(result.errors);
      return;
    }
    
    const updatedItem = result.data.toggleBought;
    //setItems function updates the state of the items list with the updated item information received from the backend.
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.itemID === updatedItem.itemID ? updatedItem : item
      )
    );
  };

  //handleAddItem allows new items to be appended to the database.
  const handleAddItem = async () => {
    const itemName = newItemName;
    const category = newCategory;

    if (!itemName || !category) {
      alert("Item name and category are required.");
      return;
    }

    const response = await fetch("http://localhost/shopping_list/backend/graphql.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `
          mutation AddItem($itemName: String!, $category: String!) {
            addItem(itemName: $itemName, category: $category) {
              itemID
              itemName
              bought
              category
            }
          }
        `,
        variables: {
          itemName,
          category
        }
      })
    });
    
    const result = await response.json();
    console.log("Add item result:", result);

    if (result.errors) {
      console.error(result.errors);
      return;
    }
    
    const newItem = result.data.addItem;
    setItems((currentItems) => [...currentItems, newItem]);

    setNewItemName("");
    setNewCategory("");
  }

  //handleDeleteItem deletes an item from the list by sending a mutation request to the backend.
  const handleDeleteItem = async (itemID: number) => {
    const response = await fetch("http://localhost/shopping_list/backend/graphql.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `
          mutation DeleteItem($itemID: Int!) {
            deleteItem(itemID: $itemID) 
          }
        `,
        variables: {
          itemID
        }
      })
    });

    const result = await response.json();
    console.log("Delete item result:", result);

    if (result.errors) {
      console.error(result.errors);
      return;
    }

    if (result.data.deleteItem) {
      setItems(items.filter(item => item.itemID !== itemID));
    }
  };

  //here the list, togglebought button, new item form and delete buttons are rendered. 
  return (
    <div className="App">
      <h1>Shopping List</h1>
      <ul>
        {items.map((item) => (
          <li key={item.itemID}> 
            {item.itemName} - {item.bought ? "Bought" : "Not Bought"} - {item.category}
            <button onClick={() => toggleBought(item.itemID, !item.bought)}>
              Toggle Bought
            </button>
            <button onClick={() => handleDeleteItem(item.itemID)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="New item name"
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Category"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  )
};