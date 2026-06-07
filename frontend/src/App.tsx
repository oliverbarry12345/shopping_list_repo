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

  //here the list and togglebought button is rendered. 
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
          </li>
        ))}
      </ul>
    </div>
  )
};