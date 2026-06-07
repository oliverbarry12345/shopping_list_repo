import type { AppQuery } from "./__generated__/AppQuery.graphql";
import { graphql, useLazyLoadQuery } from "react-relay";
import { useEffect, useState } from "react";
import styled from "styled-components";

//Styled components are defined here:
const Container = styled.div`
  width: 700px;
  margin: 40px auto;
  border: 2px solid black;
`;

const Header = styled.header`
  padding: 20px;
  border-bottom: 2px solid black;

  h1 {
    margin: 0;
    font-size: 30px;
  }
`;

const MainSection = styled.main`
  border-bottom: 2px solid black;
  text-align: left;
`;

const ColumnHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 2fr;
  gap: 16px;
  padding: 12px;
  font-weight: bold;
  border-bottom: 2px solid black;
  text-align: left;
`;

const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 2fr;
  gap: 16px;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: left;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-start;
`;

const AddSection = styled.section`
  padding: 16px 32px;

  input {
    margin-right: 8px;
  }
`;

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
//Added Item field as a minor fix / improvement
  type Item = {
    itemID: number;
    itemName: string;
    bought: boolean;
    category: string;
  };

  const [items, setItems] = useState<Item[]>([]);
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

  //after assigning bought/notbought, sortedItems allows sortingbased bought status. 
  const sortedItems = [...items].sort((a, b) => {
    return Number(a.bought) - Number(b.bought);
  });

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
    <Container>
      <Header>
        <h1>Shopping List</h1>
      </Header>

      <MainSection>
        <ColumnHeader>
          <span>Item</span>
          <span>Bought</span>
          <span>Category</span>
          <span>Actions</span>
        </ColumnHeader>
        
        {sortedItems.map((item) => ( //now items are rendered in sorted order based on bought/notbought
          <ItemRow key={item.itemID}>
            <span>{item.itemName}</span>

            <span>
              {item.bought ? "Yes" : "No"}
            </span>

            <span>{item.category}</span>

            <ButtonGroup>
              <button
                onClick={() =>
                  toggleBought(item.itemID, !item.bought)
                }
              >
                {item.bought ? "Mark Not Bought" : "Mark Bought"}
              </button>

              <button
                onClick={() =>
                  handleDeleteItem(item.itemID)
                }
              >
                Delete
              </button>
            </ButtonGroup>
          </ItemRow>
        ))}
      </MainSection>

      <AddSection>
        <h2>Add new item:</h2>

        <input
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Name"
        />

        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Category"
        />

        <button onClick={handleAddItem}>Add Item</button>
      </AddSection>
    </Container>
  )
};